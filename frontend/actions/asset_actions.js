import * as AssetApiUtil from '../util/asset_api_util';
import { RECEIVE_SESSION_ERRORS } from './session_actions';

export const RECEIVE_ASSET = 'RECEIVE_ASSET';
export const RECEIVE_ASSET_DAILY = 'RECEIVE_ASSET_DAILY';
export const LOADING_ASSETS = 'LOADING_ASSETS';

const receiveAsset = (payload) => ({
  type: RECEIVE_ASSET,
  payload
})
const receiveAssetDaily = (payload) => ({
  type: RECEIVE_ASSET_DAILY,
  payload
})

const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

// const loadingAssets = () => ({
//   type: LOADING_ASSETS
// })

export const fetchAssetPrice = (symbol, key) => dispatch => {
  return AssetApiUtil.fetchAssetPrice(symbol, key)
    .then(payload => dispatch(receiveAsset((payload))))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const fetchAssetInterval = (symbol, interval) => dispatch => {
  return AssetApiUtil.fetchAssetInterval(symbol, interval)
    .then(payload => dispatch(receiveAsset((payload))))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const fetchAssetDaily = (symbol) => dispatch => {
  return AssetApiUtil.fetchAssetDaily(symbol)
    .then(payload => dispatch(receiveAssetDaily(payload)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}
export const fetchAssetWeekly = (symbol) => dispatch => {
  return AssetApiUtil.fetchAssetWeekly(symbol)
    .then(payload => dispatch(receiveAsset(payload)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}

export const fetchCryptoDaily = (symbol) => dispatch => {
  return AssetApiUtil.fetchCryptoDaily(symbol)
    .then(payload => dispatch(receiveAssetDaily(payload)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}