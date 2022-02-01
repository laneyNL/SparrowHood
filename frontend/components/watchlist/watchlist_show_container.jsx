import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchWatchlist, updateWatchlist, deleteWatchlist, deleteWatchlistAsset} from '../../actions/watchlist_actions';
import { fetchAssetFull, fetchCryptoFull, fetchAssetDetails } from '../../actions/asset_actions';
import WatchlistShow from './watchlist_show';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.entities.users[state.session.id],
    assets: state.entities.assets,
    symbolDetails: state.entities.transactions.symbols,
    watchlist: state.entities.watchlist[ownProps.match.params.watchlistId],
    errors: state.errors.transaction
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchAssetFull: (symbol) => dispatch(fetchAssetFull(symbol)),
  fetchCryptoFull: (symbol) => dispatch(fetchCryptoFull(symbol)),
  fetchAssetDetails: (symbol) => dispatch(fetchAssetDetails(symbol)),
  fetchWatchlist: (watchlistId) => dispatch(fetchWatchlist(watchlistId)),
  updateWatchlist: (watchlist) => dispatch(updateWatchlist(watchlist)),
  deleteWatchlist: (watchlistId) => dispatch(deleteWatchlist(watchlistId)),
  deleteWatchlistAsset: (assetId) => dispatch(deleteWatchlistAsset(assetId))
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistShow);
