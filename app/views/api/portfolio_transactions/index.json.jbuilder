json.set! :data do
  @transactions.each do |transaction|
    json.set! transaction.id do
      json.extract! transaction, :id, :asset_id, :owner_id, :is_purchase, :quantity, :transaction_price, :current_total, :created_at, :symbol
    end
  end
end

json.set! :symbols do 
  @assets.each do |asset|
    json.set! asset.first do
      json.quantity @transactions.where(symbol: asset.first).sum('quantity')
      json.is_stock asset.last
    end
  end
end
json.interval @interval