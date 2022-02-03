import * as SearchApiUtil from '../util/search_api_util';

export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';

const receiveSearch = (keyword, payload) => ({
  type: RECEIVE_SEARCH,
  keyword,
  payload
})

const apiExceeded = 'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day.Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.';

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