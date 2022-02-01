import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchWatchList, updateWatchList, deleteWatchList, } from '../../actions/watchlist_actions'
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
  fetchWatchList: (watchlistId) => dispatch(fetchWatchList(watchlistId)),
  updateWatchList: (watchlist) => dispatch(updateWatchList(watchlist)),
  deleteWatchList: (watchlistId) => dispatch(deleteWatchList(watchlistId))
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistShow);
