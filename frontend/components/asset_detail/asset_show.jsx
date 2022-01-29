import React from 'react';
import { Link } from 'react-router-dom';
import AssetChart from './asset_chart'
import PortfolioHeader from '../portfolio/portfolio_header'
import TransactionForm from './transaction_form';

export default class AssetShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
   this.props.fetchTransactions(this.props.user.id);
  //  this.props.fetchAssetDaily('AMC');
   this.props.fetchAssetFull('AMC');
  }


  render() {
  //  console.log('props', this.props)
    return (

      <div className='asset-show'>
        <PortfolioHeader logout={this.props.logout} />

        <div className='asset-show-body'>
          <div className='main-chart'>

            <AssetChart fetchAssetFull={this.props.fetchAssetFull} name={this.props.symbol} assetValues={this.props.assets}  />

            <div className='' >
              <div>Market Value</div>
              <div>Average Cost</div>
            </div>

            <div className='about'>
              About Company
            </div>
            <div className='statistics'>
              stats
            </div>
          </div>
          {/* <TransactionForm symbol={this.props.symbol} user={this.props.user}/> */}
        </div>
      </div>
    )
  }
}