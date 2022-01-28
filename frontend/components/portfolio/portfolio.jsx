import React from 'react';
import { Link } from 'react-router-dom';
import AssetListItem from './asset_list_item';
import PortfolioChart from './portfolio_chart';
import AddFundsForm from './add_funds_form';
import MiniChart from './asset_mini_chart';

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      symbols: [],
      loading: true
    }
  }

  componentDidMount() {
    this.props.fetchTransactions(this.props.user.id).then( 
      () => {
        // this.props.symbols.forEach(symbol => {
        //   this.props.fetchAssetDaily(symbol)
        // })
        this.setState({ 
          transactions: Object.values(this.props.transactions), symbols: this.props.symbols,
          loading: false
        })
      })
  }

  clickBuyPower(e) {
    const buyPowerDiv = document.querySelector('.buying-power-div');
    const deposit = document.getElementById('add-funds');
    buyPowerDiv.classList.toggle('gray-background');
    deposit.classList.toggle('hidden');
  }
  
  clickDeposit(e) {
    e.preventDefault();
    document.querySelector('.funds-modal').classList.toggle('hidden');
  }


  render() {
    if (this.state.loading || !this.props.transactions || !this.props.symbols) return <div>Loading Animation</div>;
    // console.log(this.props.assets)
    return (
      
      <div className='portfolio-splash'>
        
        <AddFundsForm addFunds={this.props.addFunds} user={this.props.user} />
        <nav className='port-nav'>
          <Link to='/'><img src={'https://sparrowhood-dev.s3.us-west-1.amazonaws.com/images/green-feather.png'} alt="green feather" id='feather' /></Link>
          <div><input type="text" placeholder='Search' /></div>
          <Link to='/' className='white'>Portfolio</Link>
          <button onClick={this.props.logout}>Logout</button>
          <Link to='/'>Cash</Link>
        </nav>

        <div className='portfolio'>
          <div className='main-chart'>

            <PortfolioChart fetchTransactions={this.props.fetchTransactions} user={this.props.user} transactions={Object.values(this.props.transactions)} interval={this.props.interval}/>

            <div className='buying-power-div' >
              <div className='buying-power flex-between' onClick={this.clickBuyPower}>
                <div>Buying Power</div>
                <div>${this.props.user.buyingPower.toLocaleString("en-US")}</div>
              </div>

              <div id='add-funds' className='row hidden'>
                <div className='deposit-funds'>
                  <div className='flex-between'>
                    <div>Instant Available</div>
                    <div>${this.props.user.buyingPower.toLocaleString("en-US")}</div>
                  </div>
                  <div className='flex-between border-grey'>
                    <div>Buying Power</div>
                    <div>${this.props.user.buyingPower.toLocaleString("en-US")}</div>
                  </div>
                  <div className='width-full'>
                    <button className='deposit-button' onClick={this.clickDeposit}>Deposit Funds</button>
                    </div>
                  <div></div>
                </div>
                <div className='deposit-message'>Buying Power represents the total value of assets you can purchase.</div>
              </div>
            </div>

          </div>
          <aside className='asset-list'>
            <p>Stocks</p>
            {
              this.props.symbols.map((symbol, idx) => 
                <AssetListItem symbol={symbol} assets={this.props.assets} key={idx} />
                )
            }
            <p>Cryptocurrencies</p>
            <p>Lists</p>
          </aside>
        </div>
      </div>
    )
  }
}