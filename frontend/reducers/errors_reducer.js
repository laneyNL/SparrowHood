import { combineReducers } from "redux";
import sessionErrorsReducer from "./session_errors_reducer";
import transactionErrorsReducer from "./transaction_errors_reduce";
import watchlistErrorsReducer from "./watchlist_errors_reducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  transaction: transactionErrorsReducer,
  watchlist: watchlistErrorsReducer
})

export default errorsReducer;