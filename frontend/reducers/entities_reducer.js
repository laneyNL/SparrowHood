import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import transactionReducer from "./transaction_reducer";
import assetReducer from "./asset_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  assets: assetReducer,
  transactions: transactionReducer
})

export default entitiesReducer;