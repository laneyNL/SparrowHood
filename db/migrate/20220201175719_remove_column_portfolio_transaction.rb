class RemoveColumnPortfolioTransaction < ActiveRecord::Migration[5.2]
  def change
    remove_column :portfolio_transactions, :is_stock
  end
end
