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

  user1 = User.create!(first_name: 'Demo', last_name: 'User', username: 'demo', password:'demopassword')

  asset1 = Asset.create!(name: 'Amc', symbol: 'AMC', is_stock: true, current_price: 20.15)
  asset2 = Asset.create!(name: 'Gamestop', symbol: 'GME', is_stock: true, current_price: 200.43)
  asset3 = Asset.create!(name: 'Disney', symbol: 'DIS', is_stock: true, current_price: 77.23)

  tran1 = PortfolioTransaction.create!(asset_id: asset1.id, owner_id: user1.id, is_purchase: true, quantity: 7, transaction_price: asset1.current_price)
  tran2 = PortfolioTransaction.create!(asset_id: asset1.id, owner_id: user1.id, is_purchase: false, quantity: 5, transaction_price: 99.99)
  tran3 = PortfolioTransaction.create!(asset_id: asset2.id, owner_id: user1.id, is_purchase: true, quantity: 7, transaction_price: asset1.current_price)
  tran3 = PortfolioTransaction.create!(asset_id: asset2.id, owner_id: user1.id, is_purchase: false, quantity: 3, transaction_price: 88)
  tran3 = PortfolioTransaction.create!(asset_id: asset3.id, owner_id: user1.id, is_purchase: true, quantity: 7, transaction_price: asset1.current_price)

end