import { RECEIVE_ASSET_DAILY, RECEIVE_ASSET_FULL, RECEIVE_ASSET_INTERVAL, RECEIVE_ASSET_DETAILS, RECEIVE_CRYPTO_DAILY, RECEIVE_CRYPTO_FULL, RECEIVE_CRYPTO_INTERVAL } from "../actions/asset_actions"

const assetReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  if (!action.payload || (!action.payload["Meta Data"] && action.type !== RECEIVE_ASSET_DETAILS)) return state;
  switch (action.type) {
    case RECEIVE_ASSET_DAILY: // last 100 days
      nextState[action.payload["Meta Data"]["2. Symbol"]] = action.payload['Time Series (Daily)'];
      return nextState;
    case RECEIVE_ASSET_FULL: // 20 years of data
      nextState['full'] = {};
      nextState['full'][action.payload["Meta Data"]["2. Symbol"]] = action.payload['Time Series (Daily)'];
      return nextState;
    case RECEIVE_ASSET_INTERVAL:
      nextState['interval'] = {}
      nextState['interval'][action.payload["Meta Data"]["2. Symbol"]] = action.payload["Time Series (5min)"];
      return nextState;
    case RECEIVE_ASSET_DETAILS:
      nextState['details'] = {};
      nextState['details'][action.payload["Symbol"]] = action.payload;
      return nextState;
    case RECEIVE_CRYPTO_DAILY: // last 100 days
      nextState[action.payload["Meta Data"]["2. Digital Currency Code"]] = action.payload["Time Series (Digital Currency Daily)"];
      return nextState;
    case RECEIVE_CRYPTO_FULL: // 20 years of data
      nextState['full'] = {};
      nextState['full'][action.payload["Meta Data"]["2. Digital Currency Code"]] = action.payload["Time Series (Digital Currency Daily)"];
      return nextState;
    case RECEIVE_CRYPTO_INTERVAL:
      nextState['interval'] = {}
      nextState['interval'][action.payload["Meta Data"]["2. Digital Currency Code"]] = action.payload["Time Series Crypto (5min)"];
      return nextState;
    default:
      return state;
  }
}

export default assetReducer;
