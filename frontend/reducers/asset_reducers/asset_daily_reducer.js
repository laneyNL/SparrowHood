import { RECEIVE_ASSET_DAILY } from "../../actions/asset_actions"


const assetDailyReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ASSET_DAILY:
      if (!action.payload["Time Series (Daily)"]) return state;
      nextState[action.payload["Meta Data"]["2. Symbol"]] = action.payload['Time Series (Daily)'];
      return nextState;
    default:
      return state;
  }
}

export default assetDailyReducer;
