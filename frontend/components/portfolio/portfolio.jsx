import React from 'react';
import { Link } from 'react-router-dom';

export default class Portfolio extends React.Component {


  render() {

    return (
      <div>
        <nav>
          {/* <Link><img src={window.greenFeatherImg} alt="green feather" /></Link> */}
        </nav>
        Welcome {this.props.user.username}!
      <button onClick={ this.props.logout }>Logout</button>

      </div>
    )
  }
}