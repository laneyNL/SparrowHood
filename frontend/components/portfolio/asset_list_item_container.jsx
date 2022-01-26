import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchTransactions } from '../../actions/transaction_action';
import { fetchAssetPrice } from '../../actions/asset_actions';
import AssetListItem from './asset_list_item';

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.id],
  // asset: state.entities.assets[]
})

const mapDispatchToProps = dispatch => ({
  fetchAssetPrice: (symbol) => dispatch(fetchAssetPrice(symbol))
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetListItem);
