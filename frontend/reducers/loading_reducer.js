import { LOADING_ASSETS } from "../actions/asset_actions";

const loadingReducer = (state = false, action) => {
  switch(action.type) {
    case LOADING_ASSETS:
      
    default:
      return state;
  }
}

export default loadingReducer;