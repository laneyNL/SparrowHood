export const fetchAssetPrice = (symbol) => {
  return $.ajax({
    method: 'GET', 
    url: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey={window.alphaAPIKey}`
  })
}
export const fetchAssetInterval = (symbol, interval='5min') => {
  return $.ajax({
    method: 'GET', 
    url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${window.alphaAPIKey}`
  })
}

export const fetchAssetDaily = (symbol) => {
  return $.ajax({
    method: 'GET', 
    url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${window.alphaAPIKey}`
  })
}

export const fetchAssetWeekly = (symbol) => {
  return $.ajax({
    method: 'GET', 
    url: `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${window.alphaAPIKey}`
  })
}