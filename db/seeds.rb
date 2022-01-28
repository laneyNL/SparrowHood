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
  Asset.destroy_all

  user1 = User.create!(first_name: 'Demo', last_name: 'User', username: 'demo', password:'demopassword', buying_power: 11579.18)

  asset1 = Asset.create!(name: 'Amc', symbol: 'AMC', is_stock: true, current_price: 20.15)
  asset2 = Asset.create!(name: 'Gamestop', symbol: 'GME', is_stock: true, current_price: 200.43)
  asset3 = Asset.create!(name: 'Disney', symbol: 'DIS', is_stock: true, current_price: 77.23)
  asset4 = Asset.create!(name: 'Bitcoin', symbol: 'BTC', is_stock: false, current_price: 300.13)

  tran1 = PortfolioTransaction.create!(asset_id: asset1.id, owner_id: user1.id, is_purchase: true, quantity: 7, transaction_price: asset1.current_price, symbol: 'AMC', is_stock: true)

  tran2 = PortfolioTransaction.create!(asset_id: asset1.id, owner_id: user1.id, is_purchase: false, quantity: -5, transaction_price: 18.25, symbol: 'AMC', is_stock: true)

  tran3 = PortfolioTransaction.create!(asset_id: asset2.id, owner_id: user1.id, is_purchase: true, quantity: 7, transaction_price: asset2.current_price, symbol: 'GME', is_stock: true)

  tran4 = PortfolioTransaction.create!(asset_id: asset2.id, owner_id: user1.id, is_purchase: false, quantity: -3, transaction_price: 150, symbol: 'GME', is_stock: true)

  tran5 = PortfolioTransaction.create!(asset_id: asset3.id, owner_id: user1.id, is_purchase: true, quantity: 7, transaction_price: asset3.current_price, symbol: 'DIS', is_stock: true)

  tran5 = PortfolioTransaction.create!(asset_id: asset3.id, owner_id: user1.id, is_purchase: true, quantity: 3, transaction_price: asset3.current_price, symbol: 'DIS', is_stock: true)

  tran6 = PortfolioTransaction.create!(asset_id: asset4.id, owner_id: user1.id, is_purchase: true, quantity: 3, transaction_price: asset4.current_price, symbol: 'BTC', is_stock: false)
  tran7 = PortfolioTransaction.create!(asset_id: asset4.id, owner_id: user1.id, is_purchase: true, quantity: -1, transaction_price: 500.13, symbol: 'BTC', is_stock: false)

  tran1.created_at = 10.days.ago
  tran1.save

end