import * as SearchApiUtil from '../util/search_api_util';

export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';

const receiveSearch = (keyword, payload) => ({
  type: RECEIVE_SEARCH,
  keyword,
  payload
})

export const fetchSearch = (keyword) => dispatch => {
  if (localStorage.getItem(`search-${keyword}`)) {
    return dispatch(receiveSearch(keyword, JSON.parse(localStorage.getItem(`search-${keyword}`))))
  }
  return SearchApiUtil.fetchSearch(keyword)
    .then(payload => {
      dispatch(receiveSearch(keyword, payload));
      if (!payload['Note']) localStorage.setItem(`search-${keyword}`, JSON.stringify(payload));
    })
}