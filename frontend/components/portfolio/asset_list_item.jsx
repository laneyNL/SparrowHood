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


    // const assets = {
    //   "2022-01-27 19:05:00": {
    //     "1. open": "132.5200",
    //     "2. high": "132.5200",
    //     "3. low": "132.5200",
    //     "4. close": "132.5200",
    //     "5. volume": "503"
    //   },
    //   "2022-01-27 19:00:00": {
    //     "1. open": "133.0000",
    //     "2. high": "133.0000",
    //     "3. low": "132.8900",
    //     "4. close": "132.8900",
    //     "5. volume": "766"
    //   },
    //   "2022-01-27 18:50:00": {
    //     "1. open": "133.0000",
    //     "2. high": "133.0000",
    //     "3. low": "133.0000",
    //     "4. close": "133.0000",
    //     "5. volume": "167"
    //   },
    //   "2022-01-27 18:45:00": {
    //     "1. open": "133.0000",
    //     "2. high": "133.0000",
    //     "3. low": "133.0000",
    //     "4. close": "133.0000",
    //     "5. volume": "285"
    //   },
    //   "2022-01-27 17:25:00": {
    //     "1. open": "132.7000",
    //     "2. high": "132.7000",
    //     "3. low": "132.7000",
    //     "4. close": "132.7000",
    //     "5. volume": "236"
    //   },
    //   "2022-01-27 17:15:00": {
    //     "1. open": "132.6200",
    //     "2. high": "132.6200",
    //     "3. low": "132.6200",
    //     "4. close": "132.6200",
    //     "5. volume": "284"
    //   },
    //   "2022-01-27 17:10:00": {
    //     "1. open": "133.2500",
    //     "2. high": "133.2500",
    //     "3. low": "132.5600",
    //     "4. close": "132.5600",
    //     "5. volume": "1263"
    //   },
    //   "2022-01-27 16:45:00": {
    //     "1. open": "132.6100",
    //     "2. high": "132.6100",
    //     "3. low": "132.5800",
    //     "4. close": "132.5800",
    //     "5. volume": "214"
    //   },
    //   "2022-01-27 16:40:00": {
    //     "1. open": "132.1200",
    //     "2. high": "132.4900",
    //     "3. low": "132.1200",
    //     "4. close": "132.4900",
    //     "5. volume": "696"
    //   }
    // }
    // const quote = Object.values(assets);

    const closePrice = parseFloat(quote[0]["4. close"]);
    const openPrice = parseFloat(quote[0]["3. low"]);
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
            <MiniChart symbol={this.props.symbol} dailyValues={this.props.assets[this.props.symbol]} colorClass={colorClass}/>
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