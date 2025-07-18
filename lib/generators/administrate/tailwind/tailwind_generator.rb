require "rails/generators/base"

module Administrate
  module Generators
    class TailwindGenerator < Rails::Generators::Base
      desc "Set up TailwindCSS configuration for Administrate"
      
      source_root File.expand_path("templates", __dir__)
      
      def copy_tailwind_config
        template "tailwind.config.js", "tailwind.config.js"
      end
      
      def create_application_css
        create_file "app/assets/stylesheets/application.tailwind.css", <<~CSS
          @import "tailwindcss/base";
          @import "tailwindcss/components";
          @import "tailwindcss/utilities";
          
          /* Import Administrate styles */
          @import "administrate/application";
        CSS
      end
      
      def add_postcss_config
        create_file "config/postcss.config.js", <<~JS
          module.exports = {
            plugins: {
              'postcss-import': {},
              'tailwindcss/nesting': {},
              tailwindcss: {},
              autoprefixer: {},
            }
          }
        JS
      end
      
      def display_instructions
        say <<~INSTRUCTIONS
          
          TailwindCSS has been configured for Administrate!
          
          Next steps:
          1. Add the following to your Gemfile:
             gem 'tailwindcss-rails'
             gem 'hotwire-rails'
          
          2. Run: bundle install
          
          3. Run: bin/rails tailwindcss:install
          
          4. Update your application layout to include:
             <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
             <%= javascript_importmap_tags %>
          
          5. Your Administrate admin will now use TailwindCSS styling!
        INSTRUCTIONS
      end
    end
  end
end 