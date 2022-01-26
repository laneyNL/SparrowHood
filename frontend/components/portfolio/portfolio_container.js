import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'
import { fetchTransactions } from '../../actions/transaction_action';
import { fetchAssetPrice } from '../../actions/asset_actions';
import Portfolio from './portfolio';

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.id],
  transactions: Object.values(state.entities.transactions),
  assets: state.entities.assets
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchTransactions: (userId) => dispatch(fetchTransactions(userId)),
  fetchAssetPrice: (symbol) => dispatch(fetchAssetPrice(symbol))
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
