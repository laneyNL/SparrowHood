import { RECEIVE_WATCHLIST_ERRORS, RECEIVE_WATCHLISTS, RECEIVE_WATCHLIST} from "../actions/transaction_action";

const watchlistErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_WATCHLISTS:
      return [];
    case RECEIVE_WATCHLIST:
      return [];
    case RECEIVE_WATCHLIST_ERRORS:
      return action.errors;
    default:
      return state;
  }
}

export default watchlistErrorsReducer;