import React from 'react';
import { Link } from 'react-router-dom';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentDidMount() {
    document.title = "Log In | Sparrowhood"
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state).fail(() => {
      this.setState({ errors: this.props.errors })
    });
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value })
  }

  toggleView() {
    const passwdInput = document.getElementById('password');
    passwdInput.type = (passwdInput.type === 'password') ? 'text' : 'password';
    const eyeIcon = document.querySelector('#eye-icon');
    eyeIcon.classList.toggle('fa-eye');
    eyeIcon.classList.toggle('fa-eye-slash');
  }

  demoLogin() {
    this.props.login({ username: 'demo', password: 'demopassword' })
  }

  render() {

    return (
      <div className='login'>
        <div className='login-img'>
          {/* <img src={window.loginImg} alt="" className='login-img' /> */}
        </div>
        <div className='form'>
        
          <form onSubmit={this.handleSubmit} className='login-form'>
            <p className='login-title'>Log in to Sparrowhood</p>
            <label> Username <br />
              <div className='input-box'>
                <input type="text" value={this.state.username} onChange={this.update('username')} required autoComplete="off" className='login-input'/>
              </div>
            </label> <br />

            <label> Password <br />
              <div className='input-box'>
                <input type="password" value={this.state.password} onChange={this.update('password')} autoComplete="off" required className='login-input' id='password'/>
                <div className='eye' onClick={this.toggleView}><i className="fas fa-eye" id='eye-icon'></i></div>
              </div>
            </label>

            <p className='link forgot' onClick={this.demoLogin}>Login as Demo User</p>

            <p className='errors'>
              {this.state.errors.map((error, i) => <span key={i}><i className="fas fa-exclamation-circle"></i> {error}</span>)}
            </p>

            <button className='login-button'>Log In</button>
            <p className='create-acc'>Not on Robinhood? <Link to='/signup' className='link'>Create an account</Link></p>


          </form>
          
      
        </div>
      </div>
    )
  }
}