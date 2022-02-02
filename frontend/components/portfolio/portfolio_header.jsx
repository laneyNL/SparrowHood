import React from 'react';
import { Link } from 'react-router-dom';

export default class PortfolioHeader extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      keyword: ''
    }
  }

  render() {
    return (
      <nav className='port-nav'>
        <Link to='/'><img src={'https://sparrowhood-dev.s3.us-west-1.amazonaws.com/images/green-feather.png'} alt="green feather" id='feather' /></Link>
        <div><input type="text" placeholder='Search' value={this.state.keyword}/></div>
        <Link to='/' className='white'>Portfolio</Link>
        <button onClick={this.props.logout}>Logout</button>
        <Link to='/'>Cash</Link>
      </nav>
    )
  }
    
}