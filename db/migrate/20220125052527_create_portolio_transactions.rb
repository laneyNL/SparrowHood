class CreatePortolioTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :portolio_transactions do |t|
      t.integer :asset_id, presence: true
      t.integer :owner_id, presence: true
      t.boolean :is_purchase, presence: true
      t.float :quantity, presence: true
      t.float :transaction_price, presence: true
      t.timestamps
    end
    add_index :portolio_transactions, :asset_id
    add_index :portolio_transactions, :owner_id
  end
end
