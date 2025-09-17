ENV["RAILS_ENV"] = "test"
require "dotenv"
Dotenv.load

require File.expand_path("../../spec/example_app/config/environment", __FILE__)

require "rspec/rails"
require "capybara/rails"
require "capybara/rspec"
require "shoulda/matchers"

Dir[Rails.root.join("../../spec/support/**/*.rb")].each { |file| require file }

require "factories"

require "webmock/rspec"

WebMock.disable_net_connect!(
  allow_localhost: true, 
  allow: [
    %r{chromedriver\.storage\.googleapis\.com},
    %r{storage\.googleapis\.com/chrome-for-testing-public}
  ]
)

Capybara.register_driver :selenium_chrome_headless do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--headless')
  options.add_argument('--no-sandbox')
  options.add_argument('--disable-dev-shm-usage')
  options.add_argument('--disable-gpu')
  options.add_argument('--disable-web-security')
  options.add_argument('--disable-features=VizDisplayCompositor')
  options.add_argument('--window-size=1920,1080')
  
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.default_driver = :selenium_chrome_headless
Capybara.javascript_driver = :selenium_chrome_headless
Capybara.default_max_wait_time = 10

module Features
  # Extend this module in spec/support/features/*.rb
  include Formulaic::Dsl
end

RSpec.configure do |config|
  config.include Features, type: :feature
  config.include DashboardHelpers
  config.include ControllerHelpers
  config.infer_base_class_for_anonymous_controllers = false
  config.infer_spec_type_from_file_location!
  config.use_transactional_fixtures = false

  config.before(:each, type: :feature) do
    if Capybara.current_driver == :selenium_chrome_headless
      page.driver.browser.manage.delete_all_cookies
    end
  end

  config.after(:each, type: :feature) do
    if Capybara.current_driver == :selenium_chrome_headless
      page.driver.quit
    end
  end

  config.before(:each, type: :generator) do
    allow(Rails).to receive(:root).and_return(Pathname.new(file(".")))
  end
end

ActiveRecord::Migration.maintain_test_schema!
