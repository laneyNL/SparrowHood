@watchlists.each do |watchlist|
  json.set! watchlist.id do
    json.extract! watchlist, :id, :name, :icon
    json.set! :assets do 
      watchlist.assets.each do |asset|
        json.set! asset.id do 
          json.extract! asset, :symbol, :id
        end
      end
    end
  end
end