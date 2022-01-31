# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do 
  User.destroy_all
  PortfolioTransaction.destroy_all
  Watchlist.destroy_all
  WatchlistAsset.destroy_all

  user1 = User.create!(first_name: 'Demo', last_name: 'User', username: 'demo', password:'demopassword', buying_power: 11579.18)

  
  tran1 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: true, quantity: 7, transaction_price: 20.15, symbol: 'AMC', is_stock: true)

  tran2 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: -5, transaction_price: 18.25, symbol: 'AMC', is_stock: true)

  tran3 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: true, quantity: 7, transaction_price: 200.34, symbol: 'GME', is_stock: true)

  tran4 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: -3, transaction_price: 150, symbol: 'GME', is_stock: true)

  tran5 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: true, quantity: 7, transaction_price: 77.23, symbol: 'DIS', is_stock: true)

  tran5 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: true, quantity: 3, transaction_price: 80.12, symbol: 'DIS', is_stock: true)

  tran6 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: true, quantity: 3, transaction_price: 300.12, symbol: 'BTC', is_stock: false)
  
  tran7 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: true, quantity: -1, transaction_price: 500.13, symbol: 'BTC', is_stock: false)

  tran7 = PortfolioTransaction.create!(owner_id: 41, is_purchase: true, quantity: -3, transaction_price: 500.13, symbol: 'BTC', is_stock: false)

  tran1.created_at = 500.days.ago
  tran1.save
  tran2.created_at = 300.days.ago
  tran2.save
  tran3.created_at = 200.days.ago
  tran3.save
  tran4.created_at = 100.days.ago
  tran4.save
  tran5.created_at = 50.days.ago
  tran5.save
  tran6.created_at = 30.days.ago
  tran6.save
  tran7.created_at = 10.days.ago
  tran7.save

  watch1 = Watchlist.create!(user_id: user1.id, name: 'Stock Watchlist');
  watch2 = Watchlist.create!(user_id: user1.id, name: 'Crypt Watchlist');

  # asset1 = WatchlistAsset.create!(watchlist_id: 1, symbol: 'AMC');
  asset1 = WatchlistAsset.create!(watchlist_id: watch1.id, symbol: 'AMC');
  asset2 = WatchlistAsset.create!(watchlist_id: watch1.id, symbol: 'GME');
  asset3 = WatchlistAsset.create!(watchlist_id: watch1.id, symbol: 'DIS');
  asset4 = WatchlistAsset.create!(watchlist_id: watch2.id, symbol: 'BTC');
  # asset5 = WatchlistAsset.create!(watchlist_id: watch2.id, symbol: 'AMC');

end