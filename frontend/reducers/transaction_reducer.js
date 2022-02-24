import { RECEIVE_TRANSACTION, RECEIVE_TRANSACTIONS} from "../actions/transaction_action";


const transactionReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_TRANSACTIONS:
      nextState['data'] = action.transactions.data || {};
      nextState['interval'] = action.transactions.interval || {};
      nextState['symbols'] = {};
      if (action.transactions.symbols) {
        Object.keys(action.transactions.symbols).forEach(symbol => nextState['symbols'][symbol.toUpperCase()] = action.transactions.symbols[symbol])
      }
      return nextState;
    case RECEIVE_TRANSACTION:
      nextState['data'][action.transaction.data.id] = action.transaction.data || {};
      if (action.transaction.symbols) {
        nextState['symbols'][Object.keys(action.transaction.symbols)[0].toUpperCase()] = Object.values(action.transaction.symbols)[0];
      }
      return nextState;
    default:
      return state;
  }
}

export default transactionReducer;

