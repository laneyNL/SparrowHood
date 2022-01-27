export const fetchAssetPrice = (symbol, key) => {
  return $.ajax({
    method: 'GET', 
    url: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`
  })
}
export const fetchAssetInterval = (symbol, interval='5min', key) => {
  return $.ajax({
    method: 'GET', 
    url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${key}`
  })
}

export const fetchAssetDaily = (symbol, key) => {
  return $.ajax({
    method: 'GET', 
    url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${key}`
  })
}

export const fetchAssetWeekly = (symbol, key) => {
  return $.ajax({
    method: 'GET', 
    url: `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${key}`
  })
}