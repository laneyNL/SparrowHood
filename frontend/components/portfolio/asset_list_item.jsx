import React from 'react';
import { Link } from 'react-router-dom';

export default class AssetListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // console.log(process.env.REACT_APP_ALPHA_KEY)
    this.props.fetchAssetPrice(this.props.symbol);
  }
  render() {
    if (!this.props.assets || !this.props.symbol || !this.props.assets[this.props.symbol]) return null;
  
    const quote = this.props.assets[this.props.symbol]['Global Quote'];
    const percentDiff = ((parseFloat(quote['05. price']) - parseFloat(quote['02. open'])) / parseFloat(quote['02. open'])) * 100;

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
            <div>Chart Placeholder</div>
          </div>
          <div className='column asset-sidebar-item'>
            <div className=''>{`$${parseFloat(quote['05. price']).toFixed(2)}`}</div>
            <div className={colorClass}>{`${sign}${percentDiff.toFixed(2)}%`}</div>
          </div>
        </div>
      </Link>
    )
  }
}