class ChangeTableName < ActiveRecord::Migration[5.2]
  def change
    rename_table :portolio_transactions, :portfolio_transactions
  end
end
