import * as AssetApiUtil from '../util/asset_api_util';

export const RECEIVE_ASSET_FULL = 'RECEIVE_ASSET_FULL';
export const RECEIVE_ASSET_INTERVAL = 'RECEIVE_ASSET_INTERVAL';
export const RECEIVE_ASSET_DETAILS = 'RECEIVE_ASSET_DETAILS';
export const RECEIVE_ASSET_ERRORS = 'RECEIVE_ASSET_ERRORS';
export const CLEAR_ASSET_ERRORS = 'CLEAR_ASSET_ERRORS';

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

const receiveErrors = (errors) => ({
  type: RECEIVE_ASSET_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_ASSET_ERRORS
})

  export const fetchAssetInterval = (symbol, interval) => dispatch => {
    if (sessionStorage.getItem(`interval-${symbol}`)) {
      console.log('session storage')
      return dispatch(receiveAssetInterval(JSON.parse(sessionStorage.getItem(`interval-${symbol}`))))
    }
    return AssetApiUtil.fetchAssetInterval(symbol, interval)
      .then(payload => {
        console.log('payload-interval', payload)
        if (payload['Error Message']) return dispatch(receiveErrors(payload['Error Message']));
        dispatch(receiveAssetInterval(payload));
        if (!payload['Note']) sessionStorage.setItem(`interval-${symbol}`, JSON.stringify(payload));
      })
      .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  }

  export const fetchAssetFull = (symbol) => dispatch => {
    if (sessionStorage.getItem(`full-${symbol}`)) {
      console.log('session storage')
      return dispatch(receiveAssetFull(JSON.parse(sessionStorage.getItem(`full-${symbol}`))))
    }
    return AssetApiUtil.fetchAssetFull(symbol)
      .then(payload => {
        console.log('payload full', payload)
        if (payload['Error Message']) return dispatch(receiveErrors(payload['Error Message']));
        dispatch(receiveAssetFull(payload));
        if (!payload['Note']) sessionStorage.setItem(`full-${symbol}`, JSON.stringify(payload));
      })
      .fail(errors => {
        console.log('errors', errors)
        dispatch(receiveErrors(errors.responseJSON))
      })
  }

  export const fetchAssetDetails = (symbol) => dispatch => {
    if (sessionStorage.getItem(`details-${symbol}`)) {
      console.log('session storage')
      return dispatch(receiveAssetDetails(JSON.parse(sessionStorage.getItem(`details-${symbol}`))))
    }
    return AssetApiUtil.fetchAssetDetails(symbol)
      .then(payload => {
        console.log('payload details', payload)
        if (payload['Error Message']) return dispatch(receiveErrors(payload['Error Message']));
        dispatch(receiveAssetDetails(payload));
        if (!payload['Note']) sessionStorage.setItem(`details-${symbol}`, JSON.stringify(payload));
      })
      .fail(errors => {
        console.log('errors', errors)
        dispatch(receiveErrors(errors.responseJSON))
      })
  }