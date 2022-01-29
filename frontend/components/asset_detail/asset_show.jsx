import React from 'react';
import { Link } from 'react-router-dom';
import AssetChartContainer from './asset_chart_container'
import PortfolioHeader from '../portfolio/portfolio_header'
import TransactionForm from './transaction_form';
import LoadingSpinner from '../loading_spinner';

export default class AssetShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
  //  this.props.fetchTransactions(this.props.user.id);
  //  this.props.fetchAssetInterval('AMC');
  //  this.props.fetchAssetFull('AMC').then(() => this.setState({loading: false}));
  }

  render() {
    if (this.state.loading) return <LoadingSpinner />
    return (

      <div className='asset-show'>
        <PortfolioHeader logout={this.props.logout} />

        <div className='asset-show-body'>
          <div className='main-asset-chart'>
            <div className='assetChartContainter'>
              {/* <AssetChartContainer name={this.props.match.params.assetSymbol} symbol={this.props.match.params.assetSymbol} /> */}
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
                <div className='asset-detail-row border-bottom'><span>Shares</span><span>{'value'}</span></div>
                <div className='asset-detail-row'><span>Portfolio divrsity</span><span>{'value'}</span></div>
              </div>
            </div>

            <div className='about'>
              <div className='about-title'>About Company</div>
              <div className='about-body'>{`insert description from api`}</div>
            </div>
            <div className='stats'>
            <div className='stats-title'>Key statistics</div>
            <div className='stats-body'>{`insert description from api`}</div>
          </div>
          </div>
          <TransactionForm symbol={this.props.symbol} user={this.props.user}/>
        </div>
      </div>
    )
  }
}