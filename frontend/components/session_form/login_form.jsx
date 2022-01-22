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
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value })
  }

  render() {

    return (
      <div>

        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.firstName} onChange={this.update('firstName')} placeholder='First name' />
          <input type="text" value={this.state.lastName} onChange={this.update('lastName')} placeholder='Last name' />
          <input type="text" value={this.state.username} onChange={this.update('username')} placeholder='Username' />
          <input type="password" value={this.state.password} onChange={this.update('password')} placeholder='Password (min. 10 characters)' />
          <button>Continue</button>
        </form>
      </div>
    )
  }
}