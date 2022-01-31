class CreateWatchlists < ActiveRecord::Migration[5.2]
  def change
    create_table :watchlists do |t|
      t.integer :user_id, presence: true
      t.string :name, presence: true
      t.timestamps
    end
    add_index :watchlists, :user_id
    add_index :watchlists, :name
    add_index :watchlists, [:user_id, :name], unique: true
  end
end
