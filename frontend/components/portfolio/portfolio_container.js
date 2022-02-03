import { connect } from 'react-redux';
import { addFunds, logout } from '../../actions/session_actions'
import { fetchTransactions } from '../../actions/transaction_action';
import { fetchAssetInterval, fetchCryptoInterval } from '../../actions/asset_actions';
import { fetchWatchlists } from '../../actions/watchlist_actions'; 
import Portfolio from './portfolio';

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.id],
  transactions: state.entities.transactions.data,
  symbols: state.entities.transactions.symbols,
  assets: state.entities.assets,
  interval: state.entities.transactions.interval,
  watchlists: state.entities.watchlist,
  errors: state.entities.errors || []
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchTransactions: (userId, interval) => dispatch(fetchTransactions(userId, interval)),
  fetchAssetInterval: (symbol) => dispatch(fetchAssetInterval(symbol)),
  addFunds: (userId, amount) => dispatch(addFunds(userId, amount)),
  fetchCryptoInterval: (symbol) => dispatch(fetchCryptoInterval(symbol)),
  fetchWatchlists: (userId) => dispatch(fetchWatchlists(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
