class RemoveAssetTable < ActiveRecord::Migration[5.2]
  def change
      remove_column :portfolio_transactions, :asset_id
      drop_table :assets
  end
end
