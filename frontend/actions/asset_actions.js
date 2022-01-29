import * as AssetApiUtil from '../util/asset_api_util';
import { RECEIVE_SESSION_ERRORS } from './session_actions';

export const RECEIVE_ASSET = 'RECEIVE_ASSET';
export const RECEIVE_ASSET_DAILY = 'RECEIVE_ASSET_DAILY';
export const RECEIVE_ASSET_FULL = 'RECEIVE_ASSET_FULL';
export const RECEIVE_ASSET_INTERVAL = 'RECEIVE_ASSET_INTERVAL';
export const RECEIVE_ASSET_DETAILS = 'RECEIVE_ASSET_DETAILS';
export const RECEIVE_CRYPTO_DAILY = 'RECEIVE_CRYPTO_DAILY';
export const RECEIVE_CRYPTO_FULL = 'RECEIVE_CRYPTO_FULL';
export const RECEIVE_CRYPTO_INTERVAL = 'RECEIVE_CRYPTO_INTERVAL';
export const LOADING_ASSETS = 'LOADING_ASSETS';

// const receiveAsset = (payload) => ({
//   type: RECEIVE_ASSET,
//   payload
// })

const receiveAssetDaily = (payload) => ({
  type: RECEIVE_ASSET_DAILY,
  payload
})
const receiveAssetFull = (payload) => ({
  type: RECEIVE_ASSET_FULL,
  payload
})
const receiveAssetInterval = (payload) => ({
  type: RECEIVE_ASSET_INTERVAL,
  payload
})
const receiveAssetDetails = (payload) => ({
  type: RECEIVE_ASSET_DETAILS,
  payload
})
const receiveCryptoDaily = (payload) => ({
  type: RECEIVE_CRYPTO_DAILY,
  payload
})
const receiveCryptoFull = (payload) => ({
  type: RECEIVE_CRYPTO_FULL,
  payload
})
const receiveCryptoInterval = (payload) => ({
  type: RECEIVE_CRYPTO_INTERVAL,
  payload
})

const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

// const loadingAssets = () => ({
//   type: LOADING_ASSETS
// })

// export const fetchAssetPrice = (symbol, key) => dispatch => {
//   return AssetApiUtil.fetchAssetPrice(symbol, key)
//     .then(payload => dispatch(receiveAsset((payload))))
//     .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
// }
// export const fetchAssetWeekly = (symbol) => dispatch => {
  //   return AssetApiUtil.fetchAssetWeekly(symbol)
  //     .then(payload => dispatch(receiveAsset(payload)))
  //     .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  // }
  export const fetchAssetInterval = (symbol, interval) => dispatch => {
    return AssetApiUtil.fetchAssetInterval(symbol, interval)
      .then(payload => dispatch(receiveAssetInterval((payload))))
      .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  }
  export const fetchAssetDaily = (symbol) => dispatch => {
    return AssetApiUtil.fetchAssetDaily(symbol)
      .then(payload => dispatch(receiveAssetDaily(payload)))
      .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  }
  export const fetchAssetFull = (symbol) => dispatch => {
    return AssetApiUtil.fetchAssetFull(symbol)
      .then(payload => dispatch(receiveAssetFull(payload)))
      .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  }
  export const fetchAssetDetails = (symbol) => dispatch => {
    return AssetApiUtil.fetchAssetDetails(symbol)
      .then(payload => dispatch(receiveAssetDetails(payload)))
      .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  }
  export const fetchCryptoInterval = (symbol, interval) => dispatch => {
    return AssetApiUtil.fetchCryptoInterval(symbol, interval)
      .then(payload => dispatch(receiveCryptoInterval((payload))))
      .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  }
  export const fetchCryptoDaily = (symbol) => dispatch => {
    return AssetApiUtil.fetchCryptoDaily(symbol)
      .then(payload => dispatch(receiveCryptoDaily(payload)))
      .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  }
  export const fetchCryptoFull = (symbol) => dispatch => {
    return AssetApiUtil.fetchCryptoFull(symbol)
      .then(payload => dispatch(receiveCryptoFull(payload)))
      .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  }