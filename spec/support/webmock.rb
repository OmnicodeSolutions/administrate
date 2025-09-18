require "webmock/rspec"

# Downloading the Firefox driver involves a redirect
driver_hosts = ["github-releases.githubusercontent.com"]

# Additionally, avoid conflict with Selenium (localhost)
WebMock.disable_net_connect!(
  allow_localhost: true, 
  allow: [
    %r{chromedriver\.storage\.googleapis\.com},
    %r{storage\.googleapis\.com/chrome-for-testing-public},
    %r{googlechromelabs\.github\.io}
  ]
)