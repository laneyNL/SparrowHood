import { connect } from 'react-redux';
import { addFunds, logout } from '../../actions/session_actions'
import { fetchTransactions } from '../../actions/transaction_action';
import { fetchAssetPrice, fetchAssetDaily, fetchCryptoDaily } from '../../actions/asset_actions';
import Portfolio from './portfolio';

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.id],
  transactions: state.entities.transactions.data,
  symbols: state.entities.transactions.symbols,
  assets: state.entities.assets,
  interval: state.entities.transactions.interval,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchTransactions: (userId, interval) => dispatch(fetchTransactions(userId, interval)),
  fetchAssetPrice: (symbol) => dispatch(fetchAssetPrice(symbol)),
  fetchAssetDaily: (symbol) => dispatch(fetchAssetDaily(symbol)),
  addFunds: (userId, amount) => dispatch(addFunds(userId, amount)),
  fetchCryptoDaily: (symbol) => dispatch(fetchCryptoDaily(symbol))
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
