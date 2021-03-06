
export const fetchTransactions = (userId, interval='All Time') => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/portfolio_transactions`,
    data: { interval }
  })
}

export const createTransaction = (transaction) => {
  return $.ajax({
    method: 'POST',
    url: `/api/portfolio_transactions`,
    data: { transaction }
  })
}