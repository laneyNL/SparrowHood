class AddColumnTransactions < ActiveRecord::Migration[5.2]
  def change
    add_column :portfolio_transactions, :is_stock, :boolean, presence: true
  end
end
