source 'https://rubygems.org'
ruby "3.3.0" unless ENV["CI"]

gemspec

gem "net-imap", ">= 0.5.7"
gem "nokogiri", ">= 1.18.8"
gem "rack", ">= 2.2.14"

gem "sprockets-rails"

# Tailwind CSS para estilização
gem "tailwindcss-rails", "~> 2.0"

gem "administrate-field-image"
gem "faker"
gem "front_matter_parser"
gem "globalid"
gem "kaminari-i18n"
gem "pg"
gem "pundit"
gem "redcarpet"
gem "sassc-rails"
gem "jquery-rails"
gem "sentry-rails"
gem "sentry-ruby"
gem "unicorn"

group :development, :test do
  gem "appraisal"
  gem "awesome_print"
  gem "byebug"
  gem "dotenv-rails"
  gem "factory_bot_rails"
  gem "i18n-tasks", "1.0.13"
  gem "pry"
  gem "yard"
end

group :test do
  gem "ammeter"
  gem "capybara"
  gem "database_cleaner"
  gem "formulaic"
  gem "launchy"
  gem "selenium-webdriver"
  gem "shoulda-matchers"
  gem "timecop"
  gem "webmock"
  gem "webrick"
  gem "xpath", "3.2.0"
end

group :staging, :production do
  gem "rack-timeout"
  gem "uglifier"
end