import { RECEIVE_ASSET_DAILY } from "../actions/asset_actions"

const assetReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ASSET_DAILY:
      // console.log(action.payload)
      if (!action.payload["Time Series (Daily)"]) return state;
      nextState[action.payload["Meta Data"]["2. Symbol"]] = action.payload['Time Series (Daily)'];
      return nextState;
    default:
      return state;
  }
}

export default assetReducer;
