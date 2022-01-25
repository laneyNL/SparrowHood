class CreateAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :assets do |t|
      t.string :name, presence: true
      t.string :symbol, presence:true
      t.boolean :is_stock, presence:true
      t.float :current_price, presence:true
      t.timestamps
    end
    add_index :assets, :name, unique: true
    add_index :assets, :symbol, unique: true
  end
end
