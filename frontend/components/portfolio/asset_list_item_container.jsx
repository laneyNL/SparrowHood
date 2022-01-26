import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'
import { fetchTransactions } from '../../actions/transaction_action';
import AssetListItem from './asset_list_item'

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.id],
  transactions: Object.values(state.entities.transactions)
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchTransactions: (userId) => dispatch(fetchTransactions(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetListItem);