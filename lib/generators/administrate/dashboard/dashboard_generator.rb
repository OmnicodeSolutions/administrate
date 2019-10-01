require "rails/generators/named_base"

module Administrate
  module Generators
    class DashboardGenerator < Rails::Generators::NamedBase
      ATTRIBUTE_TYPE_MAPPING = {
        boolean: "Field::Boolean",
        date: "Field::DateTime",
        datetime: "Field::DateTime",
        enum: "Field::String",
        float: "Field::Number",
        integer: "Field::Number",
        time: "Field::Time",
        text: "Field::Text",
        string: "Field::String",
      }

      ATTRIBUTE_OPTIONS_MAPPING = {
        enum: { searchable: false },
        float: { decimals: 2 },
      }

      DEFAULT_FIELD_TYPE = "Field::String.with_options(searchable: false)"
      COLLECTION_ATTRIBUTE_LIMIT = 4
      READ_ONLY_ATTRIBUTES = %w[id created_at updated_at]

      class_option :namespace, type: :string, default: "admin"
      class_option :routes, type: :boolean, default: true, description: "Insert admin routes for resource"

      source_root File.expand_path("../templates", __FILE__)

      def create_dashboard_definition
        template(
          "dashboard.rb.erb",
          Rails.root.join("app/dashboards/#{file_name}_dashboard.rb"),
        )
      end

      def create_resource_controller
        destination = Rails.root.join(
          "app/controllers/#{admin_namespace}/#{file_name.pluralize}_controller.rb",
        )

        template("controller.rb.erb", destination)
      end

      def admin_route
        return unless options[:routes]

        routes   = Rails.root.join("config/routes.rb")
        content  = "resources :#{plural_route_name}\n"
        sentinel = /namespace :#{admin_namespace}.*\n/
        indent   = File.binread(routes)[/\n(\s*)namespace :#{admin_namespace}/, 1] || ""

        inject_into_file routes, indent + "  " + content, after: sentinel
      end

      private

      def admin_namespace
        options[:namespace]
      end

      def attributes
        klass.reflections.keys +
          klass.attribute_names -
          redundant_attributes
      end

      def form_attributes
        attributes - READ_ONLY_ATTRIBUTES
      end

      def redundant_attributes
        klass.reflections.keys.flat_map do |relationship|
          redundant_attributes_for(relationship)
        end.compact
      end

      def redundant_attributes_for(relationship)
        case association_type(relationship)
        when "Field::Polymorphic"
          [relationship + "_id", relationship + "_type"]
        when "Field::BelongsTo"
          relationship + "_id"
        end
      end

      def attr_name(attribute)
        attribute.gsub(/rich_text_/, '')
      end

      def field_type(attribute)
        type = column_type_for_attribute(attribute.to_s)

        if type
          ATTRIBUTE_TYPE_MAPPING.fetch(type, DEFAULT_FIELD_TYPE) +
            options_string(ATTRIBUTE_OPTIONS_MAPPING.fetch(type, {}))
        else
          association_type(attribute)
        end
      end

      def column_type_for_attribute(attr)
        if enum_column?(attr)
          :enum
        else
          column_types(attr)
        end
      end

      def enum_column?(attr)
        klass.respond_to?(:defined_enums) &&
          klass.defined_enums.keys.include?(attr)
      end

      def column_types(attr)
        if klass.respond_to?(:attribute_types)
          klass.attribute_types[attr].type
        else
          klass.columns.find { |column| column.name == attr }.try(:type)
        end
      end

      def association_type(attribute)
        relationship = klass.reflections[attribute.to_s]
        if relationship.has_one?
          if relationship.options[:class_name] == "ActionText::RichText"
            "Field::RichText"
          else
            "Field::HasOne"
          end
        elsif relationship.collection?
          "Field::HasMany" + relationship_options_string(relationship)
        elsif relationship.polymorphic?
          "Field::Polymorphic"
        else
          "Field::BelongsTo" + relationship_options_string(relationship)
        end
      end

      def klass
        @klass ||= Object.const_get(class_name)
      end

      def relationship_options_string(relationship)
        if relationship.class_name != relationship.name.to_s.classify
          options_string(class_name: relationship.class_name)
        else
          ""
        end
      end

      def options_string(options)
        if options.any?
          ".with_options(#{inspect_hash_as_ruby(options)})"
        else
          ""
        end
      end

      def inspect_hash_as_ruby(hash)
        hash.map { |key, value| "#{key}: #{value.inspect}" }.join(", ")
      end
    end
  end
end
