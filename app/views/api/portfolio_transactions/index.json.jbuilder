json.set! :data do
  @transactions.each do |transaction|
    json.set! transaction.id do
      json.extract! transaction, :id, :asset_id, :owner_id, :is_purchase, :quantity, :transaction_price, :current_total, :created_at, :symbol
    end
  end
end

json.symbols @symbols