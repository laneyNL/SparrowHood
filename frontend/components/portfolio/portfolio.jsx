import React from 'react';
import { Link } from 'react-router-dom';
import AssetListItem from './asset_list_item';
import PortfolioChart from './portfolio_chart';

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      symbols: []
    }
  }

  componentDidMount() {
    this.props.fetchTransactions(this.props.user.id).then( 
      () => {
        this.setState({ transactions: Object.values(this.props.transactions), symbols: this.props.symbols})
        this.props.symbols.forEach(symbol => {
          this.props.fetchAssetPrice(symbol);
        })
      })
  }

  render() {
    return (
      <div className='portfolio-splash'>
      </div>
    )
  }
}