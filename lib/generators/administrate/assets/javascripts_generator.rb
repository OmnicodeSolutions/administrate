require "rails/generators/base"

module Administrate
  module Generators
    module Assets
      class JavascriptsGenerator < Rails::Generators::Base
        JAVASCRIPTS_PATH = "app/assets/javascripts/administrate"

        source_root File.expand_path("../../../../../../", __FILE__)

        def copy_javascripts
          possible_paths = [
            File.expand_path("../../../../../", __FILE__),
            File.expand_path("../../../../../../", __FILE__),
            File.expand_path("../../../../../../../", __FILE__)
          ]
          
          source_path = possible_paths.find do |path|
            File.exist?(File.join(path, JAVASCRIPTS_PATH))
          end
          
          if source_path
            self.class.source_root source_path
            directory JAVASCRIPTS_PATH, JAVASCRIPTS_PATH
          else
            say "Warning: Could not find #{JAVASCRIPTS_PATH} in any of the expected locations", :yellow
          end
        end
      end
    end
  end
end
