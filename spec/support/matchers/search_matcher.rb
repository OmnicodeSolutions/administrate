RSpec::Matchers.define :have_a_search_bar do
    match do |page|
      page.has_selector?("input[name='search']")
    end
  
    match_when_negated do |page|
      page.has_no_selector?("input[name='search']")
    end
end  