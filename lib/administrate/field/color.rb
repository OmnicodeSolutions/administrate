require_relative "base"

module Administrate
  module Field
    class Color < Base
      def self.searchable?
        true
      end
    end
  end
end
