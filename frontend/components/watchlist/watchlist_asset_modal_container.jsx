import { connect } from 'react-redux';
import { fetchWatchlists, createWatchlist, deleteWatchlistAsset, createWatchlistAsset, clearErrors } from '../../actions/watchlist_actions';
import WatchlistAssetModal from './watchlist_asset_modal';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.entities.users[state.session.id],
    symbol: ownProps.symbol,
    // symbolDetails: state.enti ties.transactions.symbols,
    watchlists: state.entities.watchlist,
    errors: state.errors.watchlist || [],
    color: (ownProps.sign === '+') ? 'greenText' : 'redText'
  }
}

const mapDispatchToProps = dispatch => ({
  createWatchlist: (watchlist) => dispatch(createWatchlist(watchlist)),
  fetchWatchlists: (userId) => dispatch(fetchWatchlists(userId)),
  deleteWatchlistAsset: (assetId, watchlistId) => dispatch(deleteWatchlistAsset(assetId, watchlistId)),
  createWatchlistAsset: (asset) => dispatch(createWatchlistAsset(asset)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistAssetModal);
