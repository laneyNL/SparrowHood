import * as WatchlistApiUtil from '../util/watchlist_api_util';

export const RECEIVE_WATCHLISTS = 'RECEIVE_WATCHLISTS';
export const RECEIVE_WATCHLIST = 'RECEIVE_WATCHLIST';
export const DELETE_WATCHLIST = 'DELETE_WATCHLIST';
export const RECEIVE_WATCHLIST_ASSET = 'RECEIVE_WATCHLIST_ASSET';
export const DELETE_WATCHLIST_ASSET = 'DELETE_WATCHLIST_ASSET';
export const RECEIVE_WATCHLIST_ERRORS = 'RECEIVE_WATCHLIST_ERRORS';

const receiveWatchlists =  (watchlists) => ({
  type: RECEIVE_WATCHLISTS,
  watchlists
})
const receiveWatchlist =  (watchlist) => ({
  type: RECEIVE_WATCHLIST,
  watchlist
})
const deleteWatchlist = (watchlistId) => ({
  type: DELETE_WATCHLIST,
  watchlistId
})
const receiveWatchlistAsset =  (asset) => ({
  type: RECEIVE_WATCHLIST,
  asset
})
const deleteWatchlist = (assetId) => ({
  type: DELETE_WATCHLIST,
  assetId
})
const receiveErrors = (errors) => ({
  type: RECEIVE_WATCHLIST_ERRORS,
  errors
})

export const fetchWatchLists = (userId) => dispatch => {
  return WatchlistApiUtil.fetchWatchlists(userId)
    .then(watchlists => dispatch(receiveWatchlists(watchlists)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const fetchWatchList = (watchlistId) => dispatch => {
  return WatchlistApiUtil.fetchWatchlist(watchlistId)
    .then(watchlist => dispatch(receiveWatchlist(watchlist)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const createWatchList = (watchlist) => dispatch => {
  return WatchlistApiUtil.createWatchlist(watchlist)
    .then(watchlist => dispatch(receiveWatchlist(watchlist)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const updateWatchList = (watchlist) => dispatch => {
  return WatchlistApiUtil.updateWatchlist(watchlist)
    .then(watchlist => dispatch(receiveWatchlist(watchlist)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const deleteWatchList = (watchlistId) => dispatch => {
  return WatchlistApiUtil.deleteWatchlist(watchlistId)
    .then(watchlistId => dispatch(deleteWatchlist(watchlistId)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const createWatchListAsset = (asset) => dispatch => {
  return WatchlistApiUtil.createWatchlistAsset(asset)
    .then(asset => dispatch(receiveWatchlistAsset(asset)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const deleteWatchListAsset = (assetId) => dispatch => {
  return WatchlistApiUtil.deleteWatchlistAsset(assetId)
    .then(assetId => dispatch(deleteWatchlistAsset(assetId)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}