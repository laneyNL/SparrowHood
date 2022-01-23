import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions'
import SignUpForm from './signup_form';

const mapStateToProps = (state) => ({
  errors: state.errors.session,
})

const mapDispatchToProps = dispatch => ({
  signup: (user) => dispatch(signup(user)),
  login: (user) => dispatch(login(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
