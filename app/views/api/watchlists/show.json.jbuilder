json.extract! @watchlist, :id, :name, :icon
json.set! :assets do
  @watchlist.assets.each do |asset|
    json.set! asset.id do 
      json.extract! asset, :symbol
    end
  end
end
