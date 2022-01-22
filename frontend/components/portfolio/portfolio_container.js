import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'
import Portfolio from './portfolio';

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
