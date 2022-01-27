
class RemoveUniqueSymbolTransactions < ActiveRecord::Migration[5.2]
  def change
    remove_index :portfolio_transactions, :symbol
    add_index :portfolio_transactions, :symbol

  end
end
