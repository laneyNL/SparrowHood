import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'
import { fetchSearch } from '../../actions/search_actions'
import PortfolioHeader from './portfolio_header';

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.id],
  results: state.entities.search || [],
  errors: state.entities.errors || []
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchSearch: (keyword) => dispatch(fetchSearch(keyword))
})

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioHeader);
