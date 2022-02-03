import { connect } from 'react-redux';
import { fetchWatchlists, createWatchlist, deleteWatchlistAsset, createWatchlistAsset, clearErrors } from '../../actions/watchlist_actions';
import NewWatchlistForm from './new_watchlist_form'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.entities.users[state.session.id],
    errors: state.errors.watchlist || [],
    color: ownProps.color,
    toggleNewListInput: ownProps.toggleNewListInput,
  }
}

const mapDispatchToProps = dispatch => ({
  createWatchlist: (watchlist) => dispatch(createWatchlist(watchlist)),
  fetchWatchlists: (userId) => dispatch(fetchWatchlists(userId)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(NewWatchlistForm);
