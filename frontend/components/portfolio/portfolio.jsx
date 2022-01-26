import React from 'react';
import { Link } from 'react-router-dom';
import AssetListItem from './asset_list_item';
import PortfolioChart from './portfolio_chart';

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      symbols: []
    }
  }

  componentDidMount() {
    this.props.fetchTransactions(this.props.user.id).then( 
      () => {
        this.setState({ transactions: Object.values(this.props.transactions), symbols: this.props.symbols})
        this.props.symbols.forEach(symbol => {
          this.props.fetchAssetPrice(symbol);
        })
      })
  }

  render() {
    return (
      <div className='portfolio-splash'>
        <nav className='port-nav'>
          <Link to='/'><img src={'https://sparrowhood-dev.s3.us-west-1.amazonaws.com/images/green-feather.png'} alt="green feather" id='feather' /></Link>
          <div><input type="text" placeholder='Search' /></div>
          <Link to='/' className='white'>Portfolio</Link>
          <button onClick={this.props.logout}>Logout</button>
          <Link to='/'>Cash</Link>
        </nav>

        <div className='portfolio'>
          <div className='main-chart'>
            <PortfolioChart fetchTransactions={this.props.fetchTransactions} user={this.props.user} transactions={this.state.transactions}/>
            <div className='buying-power'>
              <div>Buying Power</div>
              <div>${this.props.user.buyingPower}</div>
            </div>
          </div>
          <aside className='asset-list'>
            <p>Stocks</p>
            {
              this.state.symbols.map((symbol, idx) => 
                <AssetListItem symbol={symbol} assets={this.props.assets} key={idx}/>
                )
            }
          </aside>
        </div>
      </div>
    )
  }
}