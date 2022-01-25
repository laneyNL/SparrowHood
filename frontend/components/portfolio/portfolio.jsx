import React from 'react';
import { Link } from 'react-router-dom';
import PortfolioChart from './portfolio_chart';

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchTransactions(this.props.user.id)
  }

  render() {

    return (
      <div>
        <nav className='port-nav'>
          <Link to='/'><img src={window.greenFeatherImg} alt="green feather" id='feather' /></Link>
          <div><input type="text" placeholder='Search' /></div>
          <Link to='/' className='white'>Portfolio</Link>
          <button onClick={this.props.logout}>Logout</button>
          <Link to='/'>Cash</Link>
        </nav>

        <div className='portfolio'>
          <div id='graph'>
            <PortfolioChart transactions={this.props.transactions}/>
          </div>
        </div>
        
      </div>
    )
  }
}