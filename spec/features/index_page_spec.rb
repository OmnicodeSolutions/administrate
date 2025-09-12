require "rails_helper"

search_input_selector = ".search__input"

describe "customer index page" do
  it "displays customers' name and email" do
    customer = create(:customer)

    visit admin_customers_path

    expect(page).to have_header("Customers")
    expect(page).to have_content(customer.name)
    expect(page).to have_content(customer.email)
  end

  it "adds resource/attribute name to table headers" do
    visit admin_customers_path

    expect(page).to have_css("th.email")
  end

  it "links to the customer show page", :js do
    customer = create(:customer)

    visit admin_customers_path
    click_show_link_for(customer)

    expect(page).to have_header(displayed(customer))
    expect(page).to have_content(customer.name)
    expect(page).to have_content(customer.email)
  end

  it "links to the customer show page without javascript", js: false do
    customer = create(:customer)

    visit admin_customers_path
    click_show_link_for(customer)

    expect(page).to have_header(displayed(customer))
  end

  it "links to the edit page" do
    customer = create(:customer)

    visit admin_customers_path
    click_on "Edit"

    expect(current_path).to eq(edit_admin_customer_path(customer))
  end

  it "links to the new page" do
    visit admin_customers_path
    click_on("New Customer")

    expect(current_path).to eq(new_admin_customer_path)
  end

  it "displays translated labels" do
    custom_label = "Newsletter Subscriber"

    translations = {
      helpers: {
        label: {
          customer: {
            email_subscriber: custom_label,
          },
        },
      },
    }

    with_translations(:en, translations) do
      visit admin_customers_path

      expect(page).to have_table_header(custom_label.upcase)
    end
  end

  it "sorts by count on a has_many association" do
    create_list(:order, 2, customer: create(:customer, name: "Ade"))
    create_list(:order, 3, customer: create(:customer, name: "Ben"))
    create_list(:order, 1, customer: create(:customer, name: "Cam"))

    visit admin_customers_path

    within("#main-content") { click_on "Orders" }
    expect(page).to have_text(/Cam.*Ade.*Ben.*/m)

    within("#main-content") { click_on "Orders" }
    expect(page).to have_text(/Ben.*Ade.*Cam.*/m)

  end
end
