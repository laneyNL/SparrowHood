import React from 'react';
import { Link } from 'react-router-dom';
import MiniChart from './asset_mini_chart';

export default class AssetListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // console.log(process.env.REACT_APP_ALPHA_KEY)
    // this.props.fetchAssetPrice(this.props.symbol);
  }
  render() {
    if (!this.props.assets || !this.props.symbol || !this.props.assets[this.props.symbol]) return null;
    const quote = Object.values(this.props.assets[this.props.symbol]);
    const closePrice = parseFloat(quote[0]["4. close"]);
    const openPrice = parseFloat(quote[quote.length - 1]["1. open"]);
    const percentDiff = ((closePrice - openPrice) / openPrice) * 100;

    const colorClass = percentDiff < 0 ? 'negative' : 'positive';
    const sign = percentDiff < 0 ? '' : '+';
    return (
      <Link to='/'>
        <div className='asset-sidebar row'>
          <div className='column asset-sidebar-item'>
            <div className=''>{this.props.symbol}</div>
            <div>Shares</div>
          </div>
          <div>
            <MiniChart symbol={this.props.symbol} dailyValues={this.props.assets[this.props.symbol]}/>
          </div>
          <div className='column asset-sidebar-item'>
            <div className=''>{`$${closePrice.toFixed(2)}`}</div>
            <div className={colorClass}>{`${sign}${percentDiff.toFixed(2)}%`}</div>
          </div>
        </div>
      </Link>
    )
  }
}