import { RECEIVE_ASSET } from "../../actions/asset_actions"


const assetPriceReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ASSET:
      if (!action.payload["Global Quote"]) return state;
      nextState[action.payload["Global Quote"]["01. symbol"]] = action.payload;
      return nextState;
    default:
      return state;
  }
}

export default assetPriceReducer;
