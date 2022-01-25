
export const fetchTransactions = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/portfolio_transactions`
  })
}

export const createTransaction = (transaction) => {
  return $.ajax({
    method: 'POST',
    url: `/api/portfolio_transactions`,
    data: { transaction }
  })
}