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

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state);
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value })
  }

  render() {
    
    return(
      <div>
        <ul>
          {this.props.errors.map((error, i) => <li key={i}>{error}</li>)}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.first_name} onChange={this.update('first_name')} placeholder='First name' />
          <input type="text" value={this.state.last_name} onChange={this.update('last_name')} placeholder='Last name' />
          <input type="text" value={this.state.username} onChange={this.update('username')} placeholder='Username' />
          <input type="password" value={this.state.password} onChange={this.update('password')} placeholder='Password (min. 10 characters)' />
          <button>Continue</button>
        </form>
        <Link to='/login'>Login</Link>

        
      </div>
    )
  }
}