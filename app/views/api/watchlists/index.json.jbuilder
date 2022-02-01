@watchlists.each do |watchlist|
  json.set! watchlist.id do
    json.extract! watchlist, :id, :name
    json.set! assets do 
      watchlist.assets.each do |asset|
        json.set! asset.id do 
          asset.symbol
        end
      end
    end
  end
end