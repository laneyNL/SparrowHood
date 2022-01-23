import React from 'react';
import { Link } from 'react-router-dom';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);

  }

  componentDidMount() {
    document.title = "Sign up | Robinhood"
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state);
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
    
    return(

      <div className ='signup'>
        
          <div className='left-signup'>
            <h2 className='header'>Robinhood</h2>
            <h2 className='title-left'>Make Your Money Move</h2><br />
            <p>Robinhood lets you invest in companies you love, commission-free.</p><br/>
            <p>Please enter your full legal name. Your legal name should match any form of government ID.</p><br />
            <form onSubmit={this.handleSubmit} className='signup-form'>
              <div className='name-input'>
                <input type="text" value={this.state.first_name} onChange={this.update('first_name')} placeholder='First name' />
                <input type="text" value={this.state.last_name} onChange={this.update('last_name')} placeholder='Last name' />
              </div>
              
              <div className='input-box'>
              <input type="text" value={this.state.username} onChange={this.update('username')} placeholder='Username' required autoComplete="off" className='login-input'/>
              </div>

              <div className='input-box'>
                <input type="password" value={this.state.password} onChange={this.update('password')} autoComplete="off" required className='login-input' id='password' placeholder='Password (min. 10 characters)' />
                <div className='eye' onClick={this.toggleView}><i className="fas fa-eye" id='eye-icon'></i></div>
              </div>

              
              <div className ='submit-form'>
                <button className='continue'>Continue</button>
                <div className=''>
                  <div>Already started?</div>
                  <Link to='/login' className='green'>Login in</Link>
                </div>
              </div>
              <ul className='errors-list'>
                {this.props.errors.map((error, i) => <li key={i}>{error}</li>)}
              </ul>
            </form>

            <div className='disclaimer'>
              <p>All investments involve risk, including the possible loss of principal. Investors should consider their investment objectives and risks carefully before investing.</p><br />
            <p>Commission-free trading means $0 commission trading on self-directed individual cash or margin brokerage accounts that trade U.S. listed securities via mobile devices or web. Keep in mind, other fees such as trading (non-commission) fees, Gold subscription fees, wire transfer fees, and paper statement fees may apply to your brokerage account. Please see Robinhood Financial’s<span className='green'> fee schedule</span> to learn more.</p><br />
            <p>Securities trading offered through Robinhood Financial LLC. Brokerage clearing services offered through Robinhood Securities, LLC. Both are subsidiaries of Robinhood Markets, Inc.</p><br />
            <p className='green'>Check the background of Robinhood Financial LLC and Robinhood Securities, LLC on FINRA’s BrokerCheck.</p><br />
            <p className='green'>Robinhood Terms & Conditions  Disclosure Library  Contact Us  FAQ</p><br />
            <p>© 2020 Robinhood. All rights reserved.</p>
            </div>
        </div>

        <div className='right-signup'>
          <p className='subheading'>Commission-free trading</p><br />
          <p>Break free from commission-fees and make unlimited commission-free trades in stocks, funds, and options with Robinhood Financial. Other fees may apply. View our <span className='green'>fee schedule</span> to learn more.</p><br />
          <p className='subheading'>Account Protection</p><br />
          <p>Robinhood Financial is a member of SIPC. Securities in your account protected up to $500,000. For details, please see <span className='green'>www.sipc.org.</span></p><br />
          <p className='subheading'>Stay on top of your portfolio</p><br />
          <p>Set up customized news and notifications to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you.</p>
        </div>

        
      </div>
    )
  }
}