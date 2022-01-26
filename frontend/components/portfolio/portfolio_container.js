import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'
import { fetchTransactions } from '../../actions/transaction_action';
import { fetchAssetPrice } from '../../actions/asset_actions';
import Portfolio from './portfolio';

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.id],
  transactions: state.entities.transactions.data,
  symbols: state.entities.transactions.symbols,
  assets: state.entities.assets
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchTransactions: (userId) => dispatch(fetchTransactions(userId)),
  fetchAssetPrice: (symbol) => dispatch(fetchAssetPrice(symbol))
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
