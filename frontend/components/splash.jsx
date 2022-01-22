import React from 'react';
import { Link } from 'react-router-dom';

export default class Splash extends React.Component {
  

  render() {

    return (
      <div>
        <nav>
          <div>Robinhood</div>
          <div>Products</div>
          <div>Learn</div>
          <div>Support</div>
          <div>Who we are</div>
          <Link to='/login'>Log In</Link>
          <Link to='/login'>Sign Up</Link>
        </nav>
        <div>
        </div>
      </div>
    )
  }
}