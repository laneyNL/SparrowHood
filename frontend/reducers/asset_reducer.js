import { RECEIVE_ASSET_FULL, RECEIVE_ASSET_INTERVAL, RECEIVE_ASSET_DETAILS} from "../actions/asset_actions"

const assetReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  if (!action.payload || action.payload['Note'] || (!action.payload["Meta Data"] && action.type !== RECEIVE_ASSET_DETAILS)) return state;
  switch (action.type) {
    case RECEIVE_ASSET_FULL: // 20 years of data
      nextState['full'] ||= {};
      nextState['full'][action.payload["Meta Data"]["2. Symbol"]] = action.payload['Time Series (Daily)'];
      return nextState;
    case RECEIVE_ASSET_INTERVAL: // 1 day of data
      nextState['interval'] = nextState['interval'] || {}
      nextState['interval'][action.payload["Meta Data"]["2. Symbol"]] = action.payload["Time Series (5min)"];
      return nextState;
    case RECEIVE_ASSET_DETAILS: // company details
      nextState['details'] ||= {};
      nextState['details'][action.payload["Symbol"]] = action.payload;
      return nextState;
    default:
      return state;
  }
}

export default assetReducer;
