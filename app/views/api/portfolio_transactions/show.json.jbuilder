json.set! :data do
  json.set! @transaction.id do
    json.extract! @transaction, :id, :owner_id, :is_purchase, :quantity, :transaction_price, :current_total, :created_at, :symbol
  end
end


json.set! :symbols do 
  json.set! @asset.first do
    json.quantity @quantity
    json.average_price @average_price
  end
end