import { combineReducers } from "redux";
import assetErrorsReducer from "./asset_errors_reducer";
import sessionErrorsReducer from "./session_errors_reducer";
import transactionErrorsReducer from "./transaction_errors_reduce";
import watchlistErrorsReducer from "./watchlist_errors_reducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  transaction: transactionErrorsReducer,
  watchlist: watchlistErrorsReducer,
  asset: assetErrorsReducer
})

export default errorsReducer;