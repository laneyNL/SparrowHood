
export const fetchWatchlists = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/watchlist`
  })
}

export const fetchWatchlist = (watchlistId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/watchlist/${watchlistId}`
  })
}

export const createWatchlist = (watchlist) => {
  return $.ajax({
    method: 'POST',
    url: `/api/watchlist`,
    data: { watchlist }
  })
}

export const updateWatchlist = (watchlist) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/watchlist/${watchlist.id}`,
    data: { watchlist }
  })
}

export const deleteWatchlist = (watchlistId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/watchlist/${watchlistId}`
  })
}

export const createWatchlistAsset = (asset) => {
  return $.ajax({
    method: 'POST',
    url: `/api/watchlist_assets`,
    data: { asset }
  })
}

export const deleteWatchlistAsset = (assetId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/watchlist_assets/${assetId}`
  })
}