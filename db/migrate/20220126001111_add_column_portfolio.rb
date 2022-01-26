class AddColumnPortfolio < ActiveRecord::Migration[5.2]
  def change
    add_column :portfolio_transactions, :current_total, :float, presence: true, default: 0

  
  end
end
