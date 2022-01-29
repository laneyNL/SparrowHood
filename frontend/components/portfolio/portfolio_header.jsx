import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioHeader = ({logout}) => {

  return (
    <nav className='port-nav'>
      <Link to='/'><img src={'https://sparrowhood-dev.s3.us-west-1.amazonaws.com/images/green-feather.png'} alt="green feather" id='feather' /></Link>
      <div><input type="text" placeholder='Search' /></div>
      <Link to='/' className='white'>Portfolio</Link>
      <button onClick={logout}>Logout</button>
      <Link to='/'>Cash</Link>
    </nav>
  )
}

export default PortfolioHeader;