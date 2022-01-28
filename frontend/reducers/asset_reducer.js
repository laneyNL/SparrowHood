import { RECEIVE_ASSET_DAILY } from "../actions/asset_actions"

const assetReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ASSET_DAILY:
      // console.log(action.payload)
      if (action.payload["Time Series (Daily)"]) {
        nextState[action.payload["Meta Data"]["2. Symbol"]] = action.payload['Time Series (Daily)'];
      }
      if (action.payload["Time Series (Digital Currency Daily)"]) {
        nextState[action.payload["Meta Data"]["2. Digital Currency Code"]] = action.payload["Time Series (Digital Currency Daily)"];
      }
      return nextState;
    default:
      return state;
  }
}

export default assetReducer;
