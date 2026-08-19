# http://rubydoc.info/gems/rspec-core/RSpec/Core/Configuration
RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.syntax = :expect
  end

  config.mock_with :rspec do |mocks|
    mocks.syntax = :expect
  end

  config.order = :random

  # Lets CI re-run only what failed, so a crashed browser session does not
  # fail the whole build. See .github/workflows/main.yml.
  config.example_status_persistence_file_path = "tmp/rspec_examples.txt"

  config.before(:each, js: true) do
    if Capybara.current_driver == Capybara.javascript_driver
      page.driver.browser.manage.window.resize_to(1920, 1080)
    end
  end
end
