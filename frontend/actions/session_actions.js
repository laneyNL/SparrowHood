import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

const receiveUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
})

const logoutUser = (message) => ({
  type: LOGOUT_CURRENT_USER,
  message
})

const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

export const signup = (user) => (dispatch) => {
  return SessionApiUtil.signup(user)
    .then((user) => dispatch(receiveUser(user)), (errors) => dispatch(receiveErrors(errors.responseJSON)))
}

export const login = (user) => (dispatch) => {
  return SessionApiUtil.login(user)
    .then((user) => dispatch(receiveUser(user)), (errors) => dispatch(receiveErrors(errors.responseJSON)))
}

export const logout = () => (dispatch) => {
  return SessionApiUtil.logout()
    .then((message) => dispatch(logoutUser(message)), (errors) => dispatch(receiveErrors(errors.responseJSON)))
}

export const addFunds = (userId, amount) => dispatch => {
  return SessionApiUtil.addFunds(userId, amount)
    .then(user => dispatch(receiveUser(user)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
}