json.set! :data do
  @transactions.each do |transaction|
    json.set! transaction.id do
      json.extract! transaction, :id, :owner_id, :is_purchase, :quantity, :transaction_price, :current_total, :created_at, :symbol
    end
  end
end

json.set! :symbols do 
  @symbols.each do |symbol|
    json.set! symbol do
      json.quantity @quantities[symbol]
      json.average_price @average_prices[symbol]
    end
  end
end
json.interval @interval