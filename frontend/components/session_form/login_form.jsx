import React from 'react';
import { Link } from 'react-router-dom';
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value })
  }

  render() {

    return (
      <div className='login'>
        <div className='login-img'>
          <img src='https://cdn.robinhood.com/assets/generated_assets/web-bundle-lazy-route-prod-experiment/member/632fcb3e7ed928b2a960f3e003d10b44.jpg' alt="" className='login-img' />
        </div>
        <div className='form'>
          
          <form onSubmit={this.handleSubmit} className='login-form'>
            <p className='login-title'>Log in to Sparrowhood</p>
            <label> Username <br />
              <input type="text" value={this.state.username} onChange={this.update('username')} required className='login-input'/>
            </label> <br />

            <label> Password <br />
              <input type="password" value={this.state.password} onChange={this.update('password')} required className='login-input'/>
            </label>

            <p className='link forgot'>Forgot your password?</p>

            <p className='errors'>
              {this.props.errors.map((error, i) => <span key={i}><i className="fas fa-exclamation-circle"></i> {error}</span>)}
            </p>

            <button className='login-button'>Log In</button>
            <p className='create-acc'>Not on Robinhood? <Link to='/signup' className='link'>Create an account</Link></p>


          </form>
          
      
        </div>
      </div>
    )
  }
}