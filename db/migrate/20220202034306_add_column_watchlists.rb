class AddColumnWatchlists < ActiveRecord::Migration[5.2]
  def change
    add_column :watchlists, :icon, :string, null: false, default: '&#128161;'
  end
end
