import { RECEIVE_TRANSACTION, RECEIVE_TRANSACTIONS} from "../actions/transaction_action";


const transactionReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_TRANSACTIONS:
      console.log(action.transactions)
      return action.transactions;
    case RECEIVE_TRANSACTION:
      nextState[action.transaction.id] = action.transaction;
      return nextState;
    default:
      return state;
  }
}

export default transactionReducer;

