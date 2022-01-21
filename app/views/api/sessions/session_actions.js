export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

const receiveUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
})
const logoutUser = (message) => ({
  type: LOGOUT_CURRENT_USER,
  message
})
const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
})

