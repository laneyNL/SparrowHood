import React from 'react';
import { Link } from 'react-router-dom';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value })
  }

  render() {
    
    return(
      <div>

        <form onSubmit={this.handleSubmit}>
          <label> Username
            <input type="text" value={this.state.username} onChange={this.update('username')} />
          </label>
          <label> Password
            <input type="password" value={this.state.password} onChange={this.update('password')} />
          <button>Log In</button>
          </label>
        </form>
      </div>
    )
  }
}