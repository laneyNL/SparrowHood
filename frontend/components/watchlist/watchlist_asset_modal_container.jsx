import { connect } from 'react-redux';
import { fetchWatchlists, deleteWatchlistAsset, createWatchlistAsset, clearErrors } from '../../actions/watchlist_actions';
import WatchlistAssetModal from './watchlist_asset_modal';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.entities.users[state.session.id],
    symbol: ownProps.symbol,
    // symbolDetails: state.entities.transactions.symbols,
    watchlists: state.entities.watchlist,
    errors: state.errors.watchlist || [],
    color: (ownProps.sign === '+') ? 'green' : 'red'
  }
}

const mapDispatchToProps = dispatch => ({
  fetchWatchlists: (userId) => dispatch(fetchWatchlists(userId)),
  deleteWatchlistAsset: (assetId, watchlistId) => dispatch(deleteWatchlistAsset(assetId, watchlistId)),
  createWatchlistAsset: (asset) => dispatch(createWatchlistAsset(asset)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistAssetModal);
