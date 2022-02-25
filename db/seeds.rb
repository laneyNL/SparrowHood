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

  
  tran1 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: true, quantity: 90, transaction_price: 20.15, symbol: 'AMC', current_total: user1.buying_power)

  tran2 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: -80, transaction_price: 2, symbol: 'AMC')

  tran3 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: true, quantity: 7, transaction_price: 200.34, symbol: 'GME')

  tran4 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: -5, transaction_price: 20, symbol: 'GME')

  tran5 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: true, quantity: 7, transaction_price: 77.23, symbol: 'DIS')

  tran6 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: true, quantity: 5, transaction_price: 30.12, symbol: 'DIS')
  
  tran7 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: -4, transaction_price: 12.13, symbol: 'DIS')

  tran8 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: 1, transaction_price: 300, symbol: 'DIS')
  tran9 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: -1, transaction_price: 1.00, symbol: 'DIS')
  tran10 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: 1, transaction_price: 500.13, symbol: 'DIS')
  tran11 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: -1, transaction_price: 1.00, symbol: 'DIS')
  tran12 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: 1, transaction_price: 400, symbol: 'DIS')
  tran13 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: -1, transaction_price: 10, symbol: 'DIS')
  tran14 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: 1, transaction_price: 300, symbol: 'DIS')
  tran15 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: 1, transaction_price: 300, symbol: 'DIS')
  tran16 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: 1, transaction_price: 600, symbol: 'DIS')
  tran17 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: -2, transaction_price: 1, symbol: 'DIS')
  tran18 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: 1, transaction_price: 200, symbol: 'DIS')
  tran19 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: -3, transaction_price: 1, symbol: 'DIS')
  tran20 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: false, quantity: 1, transaction_price: 100, symbol: 'DIS')
  tran21 = PortfolioTransaction.create!(owner_id: user1.id, is_purchase: true, quantity: -6, transaction_price: 10.12, symbol: 'DIS')

  # tran1.update({created_at: 10.minutes.ago, current_total: 15000})
  # tran2.update({created_at: 20.minutes.ago, current_total: 13432.23})
  # tran3.update({created_at: 30.minutes.ago, current_total: 12023.29})
  # tran4.update({created_at: 50.minutes.ago})
  # tran5.update({created_at: 200.minutes.ago})
  # tran6.update({created_at: 300.minutes.ago, current_total: 10236.53})
  # tran7.update({created_at: 2.days.ago})
  # tran8.update({created_at: 3.days.ago})
  # tran9.update({created_at: 4.days.ago})
  # tran10.update({created_at: 3.days.ago})
  # tran11.update({created_at: 4.days.ago})
  # tran12.update({created_at: 5.days.ago})
  # tran13.update({created_at: 9.days.ago, current_total: 10454.09})
  # tran14.update({created_at: 10.days.ago, current_total: 13890.90})
  # tran15.update({created_at: 20.days.ago, current_total: 11209.98})
  # tran16.update({created_at: 50.days.ago})
  # tran17.update({created_at: 100.days.ago})
  # tran18.update({created_at: 200.days.ago})
  # tran19.update({created_at: 300.days.ago})
  # tran20.update({created_at: 500.days.ago})

  tran21.update({created_at: 5.minutes.ago, current_total: 2999.24})
  tran20.update({created_at: 10.minutes.ago})
  tran19.update({created_at: 20.minutes.ago})
  tran18.update({created_at: 30.minutes.ago})
  tran17.update({created_at: 50.minutes.ago})
  tran16.update({created_at: 200.minutes.ago})
  tran15.update({created_at: 300.minutes.ago})
  tran14.update({created_at: 2.days.ago})
  tran13.update({created_at: 3.days.ago})
  tran12.update({created_at: 3.days.ago})
  tran11.update({created_at: 4.days.ago, current_total: 3000.24})
  tran10.update({created_at: 4.days.ago})
  tran9.update({created_at: 5.days.ago})
  tran8.update({created_at: 9.days.ago, current_total: 2000.00})
  tran7.update({created_at: 10.days.ago})
  tran6.update({created_at: 20.days.ago})
  tran5.update({created_at: 55.days.ago})
  tran4.update({created_at: 100.days.ago})
  tran3.update({created_at: 200.days.ago})
  tran2.update({created_at: 300.days.ago})
  tran1.update({created_at: 500.days.ago})

  watch1 = Watchlist.create!(user_id: user1.id, name: 'Stock Watchlist');

  asset1 = WatchlistAsset.create!(watchlist_id: watch1.id, symbol: 'AMC');
  asset2 = WatchlistAsset.create!(watchlist_id: watch1.id, symbol: 'GME');
  asset2 = WatchlistAsset.create!(watchlist_id: watch1.id, symbol: 'DIS');

end