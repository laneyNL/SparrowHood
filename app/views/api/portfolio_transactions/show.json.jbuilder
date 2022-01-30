json.set! :data do
  json.set! @transaction.id do
    json.extract! @transaction, :id, :owner_id, :is_purchase, :quantity, :transaction_price, :current_total, :created_at, :symbol
  end
end


json.set! :symbols do 
  json.set! @asset.first.first do
    json.quantity @quantity
    json.is_stock @asset.first.last
    json.average_price @average_price
  end
end