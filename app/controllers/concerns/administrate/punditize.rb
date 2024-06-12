module Administrate
  module Punditize
    if Object.const_defined?("Pundit")
      extend ActiveSupport::Concern

      if Pundit.const_defined?(:Authorization)
        include Pundit::Authorization
      else
        include Pundit
      end

      private


      def authorize_resource(resource)
        authorize resource
      end

      def policy_namespace
        []
      end

      def scoped_resource
        namespaced_scope = policy_namespace + [super]
        policy_scope!(pundit_user, namespaced_scope)
      end


      private

      # Like the policy_scope method in stock Pundit, but allows the 'resolve'
      # to be overridden by 'resolve_admin' for a different index scope in Admin
      # controllers.
      def policy_scope_admin(scope)
        ps = Pundit::PolicyFinder.new(scope).scope!.new(pundit_user, scope)
        if ps.respond_to? :resolve_admin
          ps.resolve_admin
        else
          ps.resolve
        end
       end

      def authorize_resource(resource)
        namespaced_resource = policy_namespace + [resource]
        authorize namespaced_resource
      end

      def authorized_action?(resource, action)
        namespaced_resource = policy_namespace + [resource]
        policy = Pundit.policy!(pundit_user, namespaced_resource)
        policy.send("#{action}?".to_sym)
      end

      def policy_scope!(user, scope)
        policy_scope_class = Pundit::PolicyFinder.new(scope).scope!

        begin
          policy_scope = policy_scope_class.new(user, pundit_model(scope))
        rescue ArgumentError
          raise(Pundit::InvalidConstructorError,
                "Invalid #<#{policy_scope_class}> constructor is called")
        end

        if policy_scope.respond_to? :resolve_admin
          Administrate.deprecator.warn(
            "Pundit policy scope `resolve_admin` method is deprecated. " +
            "Please use a namespaced pundit policy instead.",
          )
          policy_scope.resolve_admin
        else
          policy_scope.resolve
        end
      end

      def pundit_model(record)
        record.is_a?(Array) ? record.last : record
      end
    end
  end
end
