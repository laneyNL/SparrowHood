import React from 'react';
import { Link } from 'react-router-dom';
import AssetChart from './asset_chart'
import PortfolioHeader from '../portfolio/portfolio_header'
import TransactionForm from './transaction_form';
import LoadingSpinner from '../loading_spinner';

export default class AssetShow extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params.assetSymbol)
    this.state = {
      symbol: this.props.match.params.assetSymbol,
      loading: true
    }
  }

  componentDidMount() {
   this.props.fetchTransactions(this.props.user.id)
     .then(() => this.props.fetchAssetInterval(this.state.symbol))
     .then(() => this.props.fetchAssetDetails(this.state.symbol))
     .then(() => this.props.fetchAssetFull(this.state.symbol))
     .then(() => this.setState({loading: false}));
  }

  render() {
    if (this.state.loading || !this.props.assets['interval'] || !this.props.details || !this.props.symbolDetails) return <LoadingSpinner />
    // if (jQuery.isEmptyObject(this.props.assets)) return null;
    const quantityOwned = parseFloat(this.props.symbolDetails[this.props.match.params.assetSymbol]['quantity']);
    const isStock = this.props.symbolDetails[this.props.match.params.assetSymbol]['isStock'];
    const details = this.props.details[this.state.symbol];

    const assetValues = Object.values(this.props.assets['interval'][this.state.symbol]);
    const currentPrice = parseFloat(assetValues[0]["4. close"]);
    const initialPrice = parseFloat(assetValues[assetValues.length - 1]["4. close"]);
    const marketValue = (currentPrice * quantityOwned).toFixed(2).toLocaleString("en-US");
    const todayReturn = ((currentPrice - initialPrice) * quantityOwned).toFixed(2).toLocaleString("en-US");
    // const totalReturn = ((currentPrice - averageCost) * quantityOwned).toFixed(2).toLocaleString("en-US");
    const totalReturn = '';
    const symbol = (todayReturn > 0 ) ? '+' : '-';
    return (

      <div className='asset-show'>
        <PortfolioHeader logout={this.props.logout} />

        <div className='asset-show-body'>
          <div className='main-asset-chart'>
            <div className='assetChartContainter'>
              <AssetChart assets={this.props.assets} name={details['Name']} symbol={this.state.symbol} />
            </div>

            <div className='assetDetailsDiv' >
              <div className='assetDetails'>
                <p>Your market value</p>
                <p>{marketValue}</p>
                <div className='asset-detail-row border-bottom'><span >Today's return</span><span>{todayReturn}</span></div>
                <div className='asset-detail-row'><span>Total return</span><span>{totalReturn}</span></div>
                
              </div>
              <div className='assetDetails'>
                <p>Your average cost</p>
                <p>{'value'}</p>
                <div className='asset-detail-row border-bottom'><span>Shares</span><span>{this.state.quantityOwned}</span></div>
                <div className='asset-detail-row'><span>Portfolio diversity</span><span>{'value'}</span></div>
              </div>
            </div>

            <div className='about'>
              <div className='about-title'>About Company</div>
              <div className='about-body'>{details['Description']}</div>
            </div>
            <div className='stats'>
            <div className='stats-title'>Key statistics</div>
            <div className='stats-body'>{`insert description from api`}</div>
          </div>
          </div>
          <TransactionForm symbol={this.state.symbol} user={this.props.user} assets={this.props.assets} createTransaction={this.props.createTransaction} currentPrice={currentPrice} isStock={isStock} quantityOwned={this.state.quantityOwned} symnol={symbol}/>
        </div>
      </div>
    )
  }
}