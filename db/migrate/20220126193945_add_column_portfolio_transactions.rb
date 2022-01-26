class AddColumnPortfolioTransactions < ActiveRecord::Migration[5.2]
  def change
    add_column :portfolio_transactions, :symbol, :string, presence: true
    add_index :portfolio_transactions, :symbol, unique: true
  end
end
