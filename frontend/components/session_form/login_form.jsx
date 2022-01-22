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
        <div className = 'logo'>
        <img src="assets/images/green_feather.png" alt="green feather" />
        </div>
        <div className='form'>
          
          <form onSubmit={this.handleSubmit} className='login-form'>
            <p>Log in to Sparrowhood</p>
            <label> Username
              <input type="text" value={this.state.username} onChange={this.update('username')} />
            </label>

            <label> Password
              <input type="password" value={this.state.password} onChange={this.update('password')} />
            </label>

            <ul className='errors'>
              {this.props.errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>

            <button>Log In</button>
            <p>Not on Robinhood? <Link to='/signup'>Create an account</Link></p>


          </form>
          
          <div className='login-footer'>
            <p className='incomplete-app'>Logging into your account allows you to resume an incomplete application.</p>
            <p>All investments involve risk, including the possible loss of principal. Investors should consider their investment objectives and risks carefully before investing.</p>
            <p>Commission-free trading means $0 commission trading on self-directed individual cash or margin brokerage accounts that trade U.S. listed securities via mobile devices or web. Keep in mind, other fees such as trading (non-commission) fees, Gold subscription fees, wire transfer fees, and paper statement fees may apply to your brokerage account. Please see Robinhood Financial’s <span className='green'> fee schedule</span> to learn more.</p>
            <p>Securities trading offered through Robinhood Financial LLC. Brokerage clearing services offered through Robinhood Securities, LLC. Both are subsidiaries of Robinhood Markets, Inc.</p>
            <p className='green'>Check the background of Robinhood Financial LLC and Robinhood Securities, LLC on FINRA’s BrokerCheck.</p>
            <p className='green'>Robinhood Terms & Conditions  Disclosure Library  Contact Us  FAQ</p>
            <p> © 2020 Robinhood. All rights reserved.</p></div>
        </div>
      </div>
    )
  }
}