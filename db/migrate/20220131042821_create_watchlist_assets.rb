class CreateWatchlistAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :watchlist_assets do |t|
      t.integer :watchlist_id, presence: true
      t.string :symbol, presence: true
      t.timestamps
    end
    add_index :watchlist_assets, :watchlist_id
    add_index :watchlist_assets, [:watchlist_id, :symbol], unique: true
  end
end
