require "kaminari"

require "turbo-rails" if defined?(Rails)
require "stimulus-rails" if defined?(Rails)

begin
  require "tailwindcss-rails" if defined?(Rails)
rescue LoadError
end

begin
  require "sprockets-rails" if defined?(Rails)
rescue LoadError
end

require "administrate/namespace/resource"
require "administrate/not_authorized_error"
require "administrate/page/form"
require "administrate/page/show"
require "administrate/page/collection"
require "administrate/order"
require "administrate/resource_resolver"
require "administrate/search"
require "administrate/namespace"
require "administrate/namespace/resource"

module Administrate
  class Engine < ::Rails::Engine
    isolate_namespace Administrate

    @@javascripts = []
    @@stylesheets = []

    initializer "administrate.assets.precompile" do |app|
      if app.config.respond_to?(:assets) && app.config.assets.respond_to?(:precompile)
        app.config.assets.precompile += [
          "administrate/application.js",
          "administrate/application.css",
        ]
      end
    end

    initializer "administrate.importmap", before: "importmap" do |app|
      if app.config.respond_to?(:importmap)
        app.config.importmap.cache_sweepers << Rails.root.join("app/assets/javascripts/administrate")
      end
    end

    def self.add_javascript(script)
      @@javascripts << script
    end

    def self.add_stylesheet(stylesheet)
      @@stylesheets << stylesheet
    end

    def self.stylesheets
      @@stylesheets
    end

    def self.javascripts
      @@javascripts
    end

    add_javascript "administrate/application"
    add_stylesheet "administrate/application"
  end
end
