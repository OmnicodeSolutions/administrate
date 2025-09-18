require File.expand_path("boot", __dir__)

require "logger" 
require "rails"
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_view/railtie"
require "sprockets/railtie"
require "administrate/engine"

Bundler.require(*Rails.groups)

module AdministratePrototype
  class Application < Rails::Application
    config.load_defaults 7.0

    # Explicitly set the logger to avoid issues with ActiveSupport::LoggerThreadSafeLevel
    config.logger = ActiveSupport::Logger.new($stdout)
    config.logger.level = Logger::DEBUG

    config.i18n.enforce_available_locales = true

    config.generators do |generate|
      generate.helper false
      generate.javascript_engine false
      generate.request_specs false
      generate.routing_specs false
      generate.stylesheets false
      generate.test_framework :rspec
      generate.view_specs false
    end

    config.action_controller.action_on_unpermitted_parameters = :raise
    config.active_record.time_zone_aware_types = %i(datetime time)

    # Opt-out of FLoC: https://amifloced.org/
    config.action_dispatch.default_headers["Permissions-Policy"] = "interest-cohort=()"
  end
end
