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
    if (sessionStorage.getItem(`interval-${symbol}`)) {
      return dispatch(receiveAssetDetails(JSON.parse(sessionStorage.getItem(`interval-${symbol}`))))
    }
    return AssetApiUtil.fetchAssetInterval(symbol, interval)
      .then(payload => {
        dispatch(receiveAssetInterval(payload));
        if (payload !== 'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.') sessionStorage.setItem(`interval-${symbol}`, JSON.stringify(payload));
      })
      .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  }
  // export const fetchAssetDaily = (symbol) => dispatch => {
  //   return AssetApiUtil.fetchAssetDaily(symbol)
  //     .then(payload => dispatch(receiveAssetDaily(payload)))
  //     .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  // }
  export const fetchAssetFull = (symbol) => dispatch => {
    if (sessionStorage.getItem(`full-${symbol}`)) {
      return dispatch(receiveAssetDetails(JSON.parse(sessionStorage.getItem(`full-${symbol}`))))
    }
    return AssetApiUtil.fetchAssetFull(symbol)
      .then(payload => {
        dispatch(receiveAssetFull(payload));
        if (payload !== 'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.') sessionStorage.setItem(`full-${symbol}`, JSON.stringify(payload));
      })
      .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  }
  export const fetchAssetDetails = (symbol) => dispatch => {
    if (sessionStorage.getItem(`details-${symbol}`)) {
      return dispatch(receiveAssetDetails(JSON.parse(sessionStorage.getItem(`details-${symbol}`))))
    }
    return AssetApiUtil.fetchAssetDetails(symbol)
      .then(payload => {
        dispatch(receiveAssetDetails(payload));
        if (payload !== 'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.') sessionStorage.setItem(`details-${symbol}`, JSON.stringify(payload));
      })
      .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  }
  export const fetchCryptoInterval = (symbol, interval) => dispatch => {
    return AssetApiUtil.fetchCryptoInterval(symbol, interval)
      .then(payload => dispatch(receiveCryptoInterval((payload))))
      .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  }
  // export const fetchCryptoDaily = (symbol) => dispatch => {
  //   return AssetApiUtil.fetchCryptoDaily(symbol)
  //     .then(payload => dispatch(receiveCryptoDaily(payload)))
  //     .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  // }
  export const fetchCryptoFull = (symbol) => dispatch => {
    return AssetApiUtil.fetchCryptoFull(symbol)
      .then(payload => dispatch(receiveCryptoFull(payload)))
      .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  }