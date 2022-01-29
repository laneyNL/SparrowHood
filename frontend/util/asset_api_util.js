// export const fetchAssetPrice = (symbol, key) => {
//   return $.ajax({
//     method: 'GET', 
//     url: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${window.alphaAPIKey}`
//   })
// }

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
export const fetchAssetFull = (symbol) => {
  return $.ajax({
    method: 'GET', 
    url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${window.alphaAPIKey}`
  })
}

export const fetchCryptoInterval = (symbol, interval = '5min') => {
  return $.ajax({
    method: 'GET',
    url: `https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${symbol}&market=USD&interval=${interval}&apikey=${window.alphaAPIKey}`
  })
}

export const fetchCryptoDaily = (symbol) => {
  return $.ajax({
    method: 'GET', 
    url: `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=USD&apikey=${window.alphaAPIKey}`
  })
}
export const fetchCryptoFull = (symbol) => {
  return $.ajax({
    method: 'GET', 
    url: `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=USD&outputsize=full&apikey=${window.alphaAPIKey}`
  })
}

