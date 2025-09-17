require "rails_helper"

describe "order form", js: true do
  it "displays a select box for the customer" do
    customer = create(:customer)

    visit new_admin_order_path
    select(customer.name, from: "Customer")
    fill_in "Address line one", with: "Example"
    fill_in "Address line two", with: "Example"
    fill_in "Address city", with: "Example"
    fill_in "Address state", with: "Example"
    fill_in "Address zip", with: "Example"
    click_on "Save"

    expect(page).to have_link(customer.name)
    expect(page).to have_flash(
      t("administrate.controller.create.success", resource: "Order")
    )
  end

  describe "belongs_to relationships" do
    it "has stored value selected" do
      create(:customer)
      order = create(:order)

      visit edit_admin_order_path(order)
      expected = order.customer.id.to_s
      expect(find_field("Customer").value).to eq expected
    end
  end

  describe "has_many relationships" do
    it "can select multiple options", js: true do
      order = create(:order)
      line_items = create_list(:line_item, 3)

      visit edit_admin_order_path(order)
      find("input[type='checkbox'][data-value='#{line_items.first.id}']").click
      find("input[type='checkbox'][data-value='#{line_items.last.id}']").click
      click_on "Save"

      sleep 1
      order.reload
      expect(order.line_items).to include(line_items.first)
      expect(order.line_items).to include(line_items.last)
      expect(order.line_items).not_to include(line_items[1])
    end

    it "can unselect all options", js: true do
      order = create(:order)
      line_item = create(:line_item, order: order)

      visit edit_admin_order_path(order)
      multiselect = find("select#order_line_item_ids.multiselect__hidden", visible: false)
      multiselect.all("option[selected]").each { |opt| opt.unselect_option }
      click_on "Save"

      sleep 1
      order.reload
      expect(order.line_items).to be_empty
      expect(page).to have_flash(
        t("administrate.controller.update.success", resource: "Order")
      )
    end

    it "has stored values selected" do
      order = create(:order)
      create_list(:line_item, 3, order: order)

      visit edit_admin_order_path(order)

      expected = order.line_items.pluck(:id).map(&:to_s)
      expect(find("#order_line_item_ids").value).to match_array(expected)
    end

    it "displays translated labels" do
      custom_label = "Lines"
      order = create(:order)

      translations = {
        helpers: {
          label: {
            order: {
              line_items: custom_label,
            },
          },
        },
      }

      with_translations(:en, translations) do
        visit edit_admin_order_path(order)

        expect(page).to have_css("label", text: custom_label)
      end
    end

    def find_option(associated_model, field_locator)
      select_box = find("select", id: "order_line_item_ids", visible: false)
      select_box.find("option[value='#{associated_model.id}']")
    end
  end
end
