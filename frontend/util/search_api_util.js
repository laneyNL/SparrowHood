export const fetchSearch = (keyword) => {
  return $.ajax({
    method: 'GET',
    url: `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword.toUpperCase()}&apikey=${window.alphaAPIKey}`
  })
}
