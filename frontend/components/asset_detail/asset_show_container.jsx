import { connect } from 'react-redux';
import { fetchAssetFull, fetchAssetInterval, fetchAssetDetails, clearErrors } from '../../actions/asset_actions';
import { logout } from '../../actions/session_actions';
import { createTransaction, fetchTransactions } from '../../actions/transaction_action';
import { createWatchlistAsset } from '../../actions/watchlist_actions';
import AssetShow from './asset_show';

const mapStateToProps = (state, ownProps) => {
  return {
  user: state.entities.users[state.session.id],
  assets: state.entities.assets,
  symbolDetails: state.entities.transactions.symbols,
  details: state.entities.assets.details,
  errors: state.errors.transaction,
  assetErrors: state.errors.asset
}
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchAssetFull: (symbol) => dispatch(fetchAssetFull(symbol)),
  fetchAssetInterval: (symbol) => dispatch(fetchAssetInterval(symbol)),
  createTransaction: (transaction) => dispatch(createTransaction(transaction)),
  fetchTransactions: (userId, interval) => dispatch(fetchTransactions(userId, interval)),
  fetchAssetDetails: (symbol) => dispatch(fetchAssetDetails(symbol)),
  createWatchlistAsset: (asset) => dispatch(createWatchlistAsset(asset)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetShow);
