import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchWatchlists, fetchWatchlist, updateWatchlist, deleteWatchlist, deleteWatchlistAsset, clearErrors} from '../../actions/watchlist_actions';
import { fetchAssetFull, fetchCryptoFull, fetchAssetDetails } from '../../actions/asset_actions';
import WatchlistShow from './watchlist_show';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.entities.users[state.session.id],
    assets: state.entities.assets,
    symbolDetails: state.entities.transactions.symbols,
    watchlist: state.entities.watchlist[ownProps.match.params.watchlistId],
    watchlists: state.entities.watchlist,
    errors: state.errors.watchlist || []
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchAssetFull: (symbol) => dispatch(fetchAssetFull(symbol)),
  fetchCryptoFull: (symbol) => dispatch(fetchCryptoFull(symbol)),
  fetchAssetDetails: (symbol) => dispatch(fetchAssetDetails(symbol)),
  fetchWatchlist: (watchlistId) => dispatch(fetchWatchlist(watchlistId)),
  fetchWatchlists: (userId) => dispatch(fetchWatchlists(userId)),
  updateWatchlist: (watchlist) => dispatch(updateWatchlist(watchlist)),
  deleteWatchlist: (watchlistId) => dispatch(deleteWatchlist(watchlistId)),
  deleteWatchlistAsset: (assetId, watchlistId) => dispatch(deleteWatchlistAsset(assetId, watchlistId)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistShow);
