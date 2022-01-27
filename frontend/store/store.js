import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import RootReducer from '../reducers/root_reducer'

let midWare = [thunk];
if (process.env.NODE_ENV === 'development') midWare.push(logger);
const configureStore = (preloadedState = {}) => {
  return createStore(RootReducer, preloadedState, applyMiddleware(...midWare))
};

export default configureStore;