import * as WatchlistApiUtil from '../util/watchlist_api_util';

export const RECEIVE_WATCHLISTS = 'RECEIVE_WATCHLISTS';
export const RECEIVE_WATCHLIST = 'RECEIVE_WATCHLIST';
export const DELETE_WATCHLIST = 'DELETE_WATCHLIST';
export const RECEIVE_WATCHLIST_ASSET = 'RECEIVE_WATCHLIST_ASSET';
export const DELETE_WATCHLIST_ASSET = 'DELETE_WATCHLIST_ASSET';
export const RECEIVE_WATCHLIST_ERRORS = 'RECEIVE_WATCHLIST_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receiveWatchlists =  (watchlists) => ({
  type: RECEIVE_WATCHLISTS,
  watchlists
})
const receiveWatchlist =  (watchlist) => ({
  type: RECEIVE_WATCHLIST,
  watchlist
})
const removeWatchlist = (watchlistId) => ({
  type: DELETE_WATCHLIST,
  watchlistId
})
const receiveWatchlistAsset =  (asset) => ({
  type: RECEIVE_WATCHLIST_ASSET,
  asset
})
const removeWatchlistAsset = (assetId, watchlistId) => ({
  type: DELETE_WATCHLIST_ASSET,
  assetId,
  watchlistId
})
const receiveErrors = (errors) => ({
  type: RECEIVE_WATCHLIST_ERRORS,
  errors
})
export const clearErrors = () => ({
  type: CLEAR_ERRORS,
})

export const fetchWatchlists = (userId) => dispatch => {
  return WatchlistApiUtil.fetchWatchlists(userId)
    .then(watchlists => dispatch(receiveWatchlists(watchlists)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const fetchWatchlist = (watchlistId) => dispatch => {
  return WatchlistApiUtil.fetchWatchlist(watchlistId)
    .then(watchlist => dispatch(receiveWatchlist(watchlist)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const createWatchlist = (watchlist) => dispatch => {
  return WatchlistApiUtil.createWatchlist(watchlist)
    .then(watchlist => dispatch(receiveWatchlist(watchlist)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const updateWatchlist = (watchlist) => dispatch => {
  return WatchlistApiUtil.updateWatchlist(watchlist)
    .then(watchlist => dispatch(receiveWatchlist(watchlist)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const deleteWatchlist = (watchlistId) => dispatch => {
  return WatchlistApiUtil.deleteWatchlist(watchlistId)
    .then(() => dispatch(removeWatchlist(watchlistId)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const createWatchlistAsset = (asset) => dispatch => {
  return WatchlistApiUtil.createWatchlistAsset(asset)
    .then(asset => dispatch(receiveWatchlistAsset(asset)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const deleteWatchlistAsset = (assetId, watchlistId) => dispatch => {
  return WatchlistApiUtil.deleteWatchlistAsset(assetId)
    .then(() => dispatch(removeWatchlistAsset(assetId, watchlistId)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}