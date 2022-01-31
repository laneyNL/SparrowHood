import * as TransactionApiUtil from '../util/transaction_api_util';

export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';
export const RECEIVE_TRANSACTION_ERRORS = 'RECEIVE_TRANSACTION_ERRORS';

const receiveTransactions= (transactions) => ({
  type: RECEIVE_TRANSACTIONS,
  transactions
})
const receiveTransaction= (transaction) => ({
  type: RECEIVE_TRANSACTION,
    transaction
})

const receiveErrors = (errors) => ({
  type: RECEIVE_TRANSACTION_ERRORS,
  errors
})

export const fetchTransactions = (userId, interval) => dispatch => {
  return TransactionApiUtil.fetchTransactions(userId, interval)
    .then(transactions => dispatch(receiveTransactions(transactions)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}

export const createTransaction = (transaction) => dispatch => {
  return TransactionApiUtil.createTransaction(transaction)
    .then(transaction => dispatch(receiveTransaction(transaction)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}