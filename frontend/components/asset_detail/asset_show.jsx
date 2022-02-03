import React from 'react';
import AssetChart from './asset_chart'
import PortfolioHeaderContainer from '../portfolio/portfolio_header_container';
import TransactionForm from './transaction_form';
import LoadingSpinner from '../loading_spinner';
import WatchlistAssetModalContainer from '../watchlist/watchlist_asset_modal_container';

export default class AssetShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: this.props.match.params.assetSymbol,
      loading: true,
    }
  }

  componentDidMount() {
    this.props.fetchTransactions(this.props.user.id)
      .then(() => {
        Promise.all([
          this.props.fetchAssetInterval(this.state.symbol),
          this.props.fetchAssetFull(this.state.symbol),
          this.props.fetchAssetDetails(this.state.symbol)])
          .then(() => this.setState({ loading: false }));
      })
  }

  formatDollarString(num) {
    const sign = (num > 0) ? '+' : '-';
    let numberFixed = parseFloat(Math.abs(num).toFixed(2));
    return `${sign}$${numberFixed.toLocaleString("en-US")}`
  }

  renderAssetDetails(symbolDetails, quantityOwned, currentPrice, initialPrice) {
    if (!symbolDetails) return '';
    const marketValue = this.formatDollarString((currentPrice * quantityOwned));
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
          <div className='asset-detail-row border-bottom'><span >Today's return</span><span>{this.formatDollarString(todayReturn)}</span></div>
          <div className='asset-detail-row'><span>Total return</span><span>{this.formatDollarString(totalReturn)}</span></div>

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
    if (this.state.loading) return <LoadingSpinner />

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
              <AssetChart assets={this.props.assets} name={details['Name']} symbol={this.state.symbol} />
            </div>

            {this.renderAssetDetails(symbolDetails, quantityOwned, currentPrice, initialPrice)}

            <div className='about'>
              <div className='about-title'>About Company</div>
              <div className='about-body'>{details['Description']}</div>
            </div>
            {/* <div className='stats'>
              <div className='stats-title'>Key statistics</div>
              <div className='stats-body'>{`insert description from api`}</div>
            </div> */}
          </div>
          <TransactionForm symbol={this.state.symbol} user={this.props.user} assets={this.props.assets} createTransaction={this.props.createTransaction} currentPrice={currentPrice} quantityOwned={quantityOwned} sign={sign} errors={this.props.errors} createWatchlistAsset={this.props.createWatchlistAsset}/>
        </div>
      </div>
    )
  }
}