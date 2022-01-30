import React from 'react';
import { Link } from 'react-router-dom';
import AssetChart from './asset_chart'
import PortfolioHeader from '../portfolio/portfolio_header'
import TransactionForm from './transaction_form';
import LoadingSpinner from '../loading_spinner';

export default class AssetShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: this.props.match.params.assetSymbol,
      loading: true
    }
  }

  componentDidMount() {
   this.props.fetchTransactions(this.props.user.id)
     .then(() => this.props.fetchAssetInterval(this.state.symbol))
  //    .then(() => this.props.fetchAssetDetails(this.state.symbol))
  //    .then(() => this.props.fetchAssetFull(this.state.symbol))
  //    .then(() => this.setState({loading: false}));
  }

  render() {
    // if (this.state.loading || !this.props.assets || !this.props.details || !this.props.symbolDetails) return <LoadingSpinner />
    if (jQuery.isEmptyObject(this.props.assets)) return null;
    // const details = this.props.details[this.state.symbol];
    return (

      <div className='asset-show'>
        <PortfolioHeader logout={this.props.logout} />

        <div className='asset-show-body'>
          <div className='main-asset-chart'>
            <div className='assetChartContainter'>
              {/* <AssetChart assets={this.props.assets} name={details['Name']} symbol={this.state.symbol} /> */}
            </div>

            <div className='assetDetailsDiv' >
              <div className='assetDetails'>
                <p>Your market value</p>
                <p>{'value'}</p>
                <div className='asset-detail-row border-bottom'><span >Today's return</span><span>{'value'}</span></div>
                <div className='asset-detail-row'><span>Total return</span><span>{'value'}</span></div>
                
              </div>
              <div className='assetDetails'>
                <p>Your average cost</p>
                <p>{'value'}</p>
                {/* <div className='asset-detail-row border-bottom'><span>Shares</span><span>{this.props.symbolDetails[this.state.symbol]['quantity']}</span></div> */}
                <div className='asset-detail-row'><span>Portfolio divrsity</span><span>{'value'}</span></div>
              </div>
            </div>

            <div className='about'>
              <div className='about-title'>About Company</div>
              {/* <div className='about-body'>{details['Description']}</div> */}
            </div>
            <div className='stats'>
            <div className='stats-title'>Key statistics</div>
            <div className='stats-body'>{`insert description from api`}</div>
          </div>
          </div>
          <TransactionForm symbol={this.state.symbol} user={this.props.user} assets={this.props.assets} createTransaction={this.props.createTransaction}/>
        </div>
      </div>
    )
  }
}