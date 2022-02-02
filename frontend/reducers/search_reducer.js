import { RECEIVE_SEARCH } from '../actions/search_actions';

const searchReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_SEARCH:
      nextState[action.keyword] = action.payload;
      return nextState;
    default:
      return state;
  }
}

export default searchReducer;