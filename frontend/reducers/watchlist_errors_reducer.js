import { RECEIVE_WATCHLIST_ERRORS, RECEIVE_WATCHLISTS, RECEIVE_WATCHLIST, CLEAR_ERRORS} from "../actions/watchlist_actions";

const watchlistErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_WATCHLISTS:
      return [];
    case RECEIVE_WATCHLIST:
      return [];
    case CLEAR_ERRORS:
      return [];
    case RECEIVE_WATCHLIST_ERRORS:
      return action.errors || state;
    default:
      return state;
  }
}

export default watchlistErrorsReducer;