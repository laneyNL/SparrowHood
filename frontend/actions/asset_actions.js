import * as AssetApiUtil from '../util/asset_api_util';
import { RECEIVE_SESSION_ERRORS } from './session_actions';

export const RECEIVE_ASSET = 'RECEIVE_ASSET';

const receiveAsset = (asset) => ({
  type: RECEIVE_ASSET,
  asset
})

const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

export const fetchAsset = (symbol) => dispatch => {
  return AssetApiUtil.fetchAsset(symbol)
    .then(asset => dispatch(receiveAsset(asset)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}