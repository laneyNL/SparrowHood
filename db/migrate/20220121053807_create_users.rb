class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name, presence: true
      t.string :last_name, presence: true
      t.string :username, presence: true
      t.string :password_digest, presence: true
      t.string :session_token, presence: true
      t.float :buying_power, presence: true, default: 0
      t.timestamps
    end
    add_index :users, :username, unique: true
    add_index :users, :session_token, unique: true
  end
end
