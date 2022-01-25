@transactions.each do |transaction|
  json.set! transaction.id do
    json.extract! transaction, :id, :asset_id, :owner_id, :is_purchase, :quantity, :transaction_price
  end
end
