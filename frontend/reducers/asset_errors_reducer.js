import { RECEIVE_ASSET_ERRORS, CLEAR_ASSET_ERRORS } from "../actions/asset_actions";

const assetErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ASSET_ERRORS:
      return ['Invalid stock symbol.'];
    case CLEAR_ASSET_ERRORS:
      return [];
    default:
      return state;
  }
}

export default assetErrorsReducer;