import React from 'react';
import { Link } from 'react-router-dom';

export default class Portfolio extends React.Component {


  render() {

    return (
      <div>
        Portfolio
      <button onClick={ this.props.logout }>Logout</button>

      </div>
    )
  }
}