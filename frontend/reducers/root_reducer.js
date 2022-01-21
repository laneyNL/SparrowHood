import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import entitiesReducer from "./entities_reducer";

const RootReducer = combineReducers({
  session: sessionReducer,
  entities: entitiesReducer
})

export default RootReducer;