require_relative "base"

module Administrate
  module Field
    class Color < Field::Base
      def self.searchable?
        true
      end

      def to_s
        if data.nil?
          "-"
        else
          data.to_s
        end
      end
    end
  end
end
