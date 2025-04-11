class AddDefaultToKindInCustomers < ActiveRecord::Migration[7.0]
  def change
    change_column_default :customers, :kind, from: nil, to: "standard"
  end
end