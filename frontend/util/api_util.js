
export const fetchAsset = (symbol) => {
  return $.ajax({
    method: 'GET', 
    urL: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.REACT_APP_VARIABLE}`
  })
}