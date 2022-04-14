import React from 'react';
import AssetChart from './asset_chart'
import PortfolioHeaderContainer from '../portfolio/portfolio_header_container';
import TransactionForm from './transaction_form';
import LoadingSpinner from '../loading_spinner';
import WatchlistAssetModalContainer from '../watchlist/watchlist_asset_modal_container';
import { formatDollarString } from '../../util/format_util';

export default class AssetShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: this.props.match.params.assetSymbol,
      loading: true,
      color: 'green'
    }
    this.setColor = this.setColor.bind(this);
  }

  setColor(color) {
    if (this.state.color !== color) {
      this.setState({ color: color});
    }
  }

  componentDidMount() {
    document.title = `${this.props.match.params.assetSymbol} | Sparrowhood`;
      this.props.fetchTransactions(this.props.user.id)
        .then(() => {
          Promise.all([
            this.props.fetchAssetInterval(this.props.match.params.assetSymbol),
            this.props.fetchAssetFull(this.props.match.params.assetSymbol),
            this.props.fetchAssetDetails(this.props.match.params.assetSymbol)])
            .then(() => this.setState({ loading: false, symbol: this.props.match.params.assetSymbol }));
        })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.assetSymbol !== this.props.match.params.assetSymbol) {
      this.componentDidMount();
    }
  }

  formatDollarStringSign(num) {
    const sign = (num > 0) ? '+' : '';
    return `${sign}${formatDollarString(num)}`
  }

  renderAssetDetails(symbolDetails, quantityOwned, currentPrice, initialPrice) {
    if (!symbolDetails) return '';
    const marketValue = `$${(currentPrice * quantityOwned).toFixed(2)}`;
    const todayReturn = ((currentPrice - initialPrice) * quantityOwned);
    const averageCost = parseFloat(symbolDetails.averagePrice);
    const totalReturn = ((currentPrice - averageCost) * quantityOwned);

    const allSharesArr = Object.values(this.props.symbolDetails).map(value => parseFloat(value.quantity));
    const allShares = allSharesArr.reduce((num, total) => (num + total));
    const diversity = ((quantityOwned / allShares) * 100).toFixed(2);
    return (
      <div className='assetDetailsDiv' >
        <div className='assetDetails'>
          <p>Your market value</p>
          <p className='value-subtitle'>{marketValue}</p>
          <div className='asset-detail-row border-bottom'><span >Today's return</span><span>{this.formatDollarStringSign(todayReturn)}</span></div>
          <div className='asset-detail-row'><span>Total return</span><span>{this.formatDollarStringSign(totalReturn)}</span></div>

        </div>
        <div className='assetDetails'>
          <p>Your average cost</p>
          <p className='value-subtitle'>{`$${averageCost.toFixed(2)}`}</p>
          <div className='asset-detail-row border-bottom'><span>Shares</span><span>{quantityOwned}</span></div>
          <div className='asset-detail-row'><span>Portfolio diversity</span><span>{`${diversity}%`}</span></div>
        </div>
      </div>
    )
  }

  render() {
    if (this.state.loading || !this.props.details || !this.props.assets['interval'] || !this.props.details[this.state.symbol] || !this.props.assets['interval'][this.state.symbol]) return <LoadingSpinner/>
    if (this.props.assetErrors.length) return <LoadingSpinner errors={this.props.assetErrors} clearErrors={this.props.clearErrors} history={this.props.history}/>

    const symbolDetails = this.props.symbolDetails[this.props.match.params.assetSymbol];
    const quantityOwned = symbolDetails ? parseFloat(symbolDetails['quantity']) : 0;
    const details = this.props.details[this.state.symbol] || {};
    const assetValues = Object.values(this.props.assets['interval'][this.state.symbol]);
    const currentPrice = parseFloat(assetValues[0]["4. close"]);
    const initialPrice = parseFloat(assetValues[assetValues.length - 1]["4. close"]);
    const sign = ((currentPrice - initialPrice) > 0 ) ? '+' : '-';

    
    return (

      <div className='asset-show'>
        <WatchlistAssetModalContainer symbol={this.state.symbol} sign={sign}/>
        <PortfolioHeaderContainer />

        <div className='asset-show-body'>
          <div className='main-asset-chart'>
            
            <div className='assetChartContainter'>
              <AssetChart assets={this.props.assets} name={details['Name']} symbol={this.state.symbol} color={this.state.color} setColor={this.setColor}/>
            </div>

            {this.renderAssetDetails(symbolDetails, quantityOwned, currentPrice, initialPrice)}

            <div className='about'>
              <div className='about-title'>About Company</div>
              <div className='about-body'>{details['Description']}</div>
            </div>

          </div>

          <TransactionForm symbol={this.props.match.params.assetSymbol} user={this.props.user} assets={this.props.assets} createTransaction={this.props.createTransaction} currentPrice={currentPrice} quantityOwned={quantityOwned} sign={sign} errors={this.props.errors} createWatchlistAsset={this.props.createWatchlistAsset} color={this.state.color}/>

        </div>
      </div>
    )
  }
}