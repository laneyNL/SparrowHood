import { RECEIVE_ASSET } from "../actions/asset_actions"


const assetReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ASSET:
      // nextState[action.payload.data.symbol] = action.payload;
      return nextState;
    default:
      return state;
  }
}

export default assetReducer;

