import React from 'react';
import { Link } from 'react-router-dom';
import AssetListItem from './asset_list_item';
import PortfolioChart from './portfolio_chart';
import AddFundsForm from './add_funds_form';
import PortfolioHeaderContainer from './portfolio_header_container';
import LoadingSpinner from '../loading_spinner';
import MiniWatchlistItem from '../watchlist/mini_watchlist_item';
import { formatDollarString } from '../../util/format_util'

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSymbols: [],
      watchlistValues: [],
      loading: true
    }
  }

  componentDidMount() {
    document.body.style.backgroundColor = 'black';
    document.title = "Portfolio | Sparrowhood";
    this.props.fetchTransactions(this.props.user.id)
      .then( () => {
        this.props.fetchWatchlists(this.props.user.id)
          .then(() => {
            this.setState({
              stockSymbols: Object.keys(this.props.symbols),
              watchlistValues: Object.values(this.props.watchlists)
            });

            Promise.all(this.state.stockSymbols.map(symbol =>
              this.props.fetchAssetInterval(symbol)))
              .then(() => this.setState({ loading: false }));
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
    if (this.state.loading) return <LoadingSpinner/>;
    return (
      <div className='portfolio-splash'>
        
        <AddFundsForm addFunds={this.props.addFunds} user={this.props.user} fetchTransactions={this.props.fetchTransactions} user={this.props.user}/>
        
        <PortfolioHeaderContainer />

        <div className='portfolio'>
          <div className='main-chart'>

            <PortfolioChart fetchTransactions={this.props.fetchTransactions} user={this.props.user} transactions={Object.values(this.props.transactions)} interval={this.props.interval}/>

            <div className='buying-power-div' >
              <div className='buying-power flex-between' onClick={this.clickBuyPower}>
                <div>Buying Power</div>
                <div>{formatDollarString(this.props.user.buyingPower)}</div>
              </div>

              <div id='add-funds' className='row hidden'>
                <div className='deposit-funds'>
                  <div className='flex-between'>
                    <div>Instant Available</div>
                    <div>{formatDollarString(this.props.user.buyingPower)}</div>
                  </div>
                  <div className='flex-between border-grey'>
                    <div>Buying Power</div>
                    <div>{formatDollarString(this.props.user.buyingPower)}</div>
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
              this.state.stockSymbols.map((symbol, idx) =>
                <AssetListItem symbol={symbol} assets={this.props.assets['interval']} key={idx} quantity={this.props.symbols[symbol].quantity}/>
                )
            }
            <p>Lists</p>
            {
              this.state.watchlistValues.map((watchlist) =>
                <Link to={`/watchlist/${watchlist.id}`} key={watchlist.id}><MiniWatchlistItem watchlist={watchlist}  /></Link>
              )
            }
          </aside>
        </div>
      </div>
    )
  }
}