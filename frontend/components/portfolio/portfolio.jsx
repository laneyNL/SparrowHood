import React from 'react';
import { Link } from 'react-router-dom';
import AssetListItemContainer from './asset_list_item_container';
import PortfolioChart from './portfolio_chart';

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // this.props.fetchTransactions(this.props.user.id).then(
    //   () => {
    //     this.props.transactions.forEach( tran => {
    //       this.props.fetchAssetPrice(tran.symbol);
    //     })
    //   })
  }

  render() {
    return (
      <div className='portfolio-splash'>
        <nav className='port-nav'>
          <Link to='/'><img src={window.greenFeatherImg} alt="green feather" id='feather' /></Link>
          <div><input type="text" placeholder='Search' /></div>
          <Link to='/' className='white'>Portfolio</Link>
          <button onClick={this.props.logout}>Logout</button>
          <Link to='/'>Cash</Link>
        </nav>

        <div className='portfolio'>
          <div className='main-chart'>
            <PortfolioChart fetchTransactions={this.props.fetchTransactions} user={this.props.user} transactions={this.props.transactions}/>
            <div className='buying-power'>
              <div>Buying Power</div>
              <div>${this.props.user.buyingPower}</div>
            </div>
          </div>
          <aside className='asset-list'>
            <p>Stocks</p>
            <AssetListItemContainer />
          </aside>
        </div>
      </div>
    )
  }
}