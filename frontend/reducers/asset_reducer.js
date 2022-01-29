import { RECEIVE_ASSET_DAILY, RECEIVE_ASSET_FULL } from "../actions/asset_actions"

const assetReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_ASSET_DAILY: // last 100 days
      // console.log(action.payload)
      //stock api
      if (action.payload["Time Series (Daily)"]) {
        nextState[action.payload["Meta Data"]["2. Symbol"]] = action.payload['Time Series (Daily)'];
      }
      // crypto api
      if (action.payload["Time Series (Digital Currency Daily)"]) {
        nextState[action.payload["Meta Data"]["2. Digital Currency Code"]] = action.payload["Time Series (Digital Currency Daily)"];
      }
      return nextState;
    case RECEIVE_ASSET_FULL: // 20 years of data
      nextState['full'] = {};
      //stock api
      if (action.payload["Time Series (Daily)"]) {
        nextState['full'][action.payload["Meta Data"]["2. Symbol"]] = action.payload['Time Series (Daily)'];
      }
      // crypto api
      if (action.payload["Time Series (Digital Currency Daily)"]) {
        nextState['full'][action.payload["Meta Data"]["2. Digital Currency Code"]] = action.payload["Time Series (Digital Currency Daily)"];
      }
      return nextState;
    default:
      return state;
  }
}

export default assetReducer;
