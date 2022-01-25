json.set! @asset.id do
  json.extract! @asset, :id, :name, :symbol, :is_stock, :current_price

end

