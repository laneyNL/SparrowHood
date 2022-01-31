class AddNullConstraint < ActiveRecord::Migration[5.2]
  def change
    change_column_null :portfolio_transactions, :owner_id, false
    change_column_null :portfolio_transactions, :is_purchase, false
    change_column_null :portfolio_transactions, :quantity, false
    change_column_null :portfolio_transactions, :transaction_price,false
    change_column_null :portfolio_transactions, :current_total, false
    change_column_null :portfolio_transactions, :symbol, false
    change_column_null :portfolio_transactions, :is_stock, false

    change_column_null :users, :first_name, false
    change_column_null :users, :last_name, false
    change_column_null :users, :username, false
    change_column_null :users, :password_digest, false
    change_column_null :users, :session_token, false
    change_column_null :users, :buying_power, false

    change_column_null :watchlist_assets, :watchlist_id, false
    change_column_null :watchlist_assets, :symbol, false

    change_column_null :watchlists, :user_id, false
    change_column_null :watchlists, :name, false


  end
end
