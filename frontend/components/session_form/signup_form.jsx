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

  render() {
    
    return(

      <div className ='signup'>
        
        <form onSubmit={this.handleSubmit} className='signup-form'>
          <div className='name-input'>
            <input type="text" value={this.state.first_name} onChange={this.update('first_name')} placeholder='First name' />
            <input type="text" value={this.state.last_name} onChange={this.update('last_name')} placeholder='Last name' />
          </div>
          <input type="text" value={this.state.username} onChange={this.update('username')} placeholder='Username' />
          <input type="password" value={this.state.password} onChange={this.update('password')} placeholder='Password (min. 10 characters)' />
          <ul>
            {this.props.errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
          <div>
          <button>Continue</button>
            <Link to='/login'>Login</Link>
          </div>
        </form>
        <div className='signup-sidebar'>
          <p className='subheading'>Commission-free trading</p>
          <p>Break free from commission-fees and make unlimited commission-free trades in stocks, funds, and options with Robinhood Financial. Other fees may apply. View our <span className='green'>fee schedule</span> to learn more.</p>
          <p className='subheading'>Account Protection</p>
          <p>Robinhood Financial is a member of SIPC. Securities in your account protected up to $500,000. For details, please see <span className='green'>www.sipc.org.</span></p>
          <p className='subheading'>Stay on top of your portfolio</p>
          <p>Set up customized news and notifications to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you.</p>
        </div>

        
      </div>
    )
  }
}