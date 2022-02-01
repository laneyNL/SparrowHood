import React from 'react';
import LoadingSpinner from '../loading_spinner';

export default class WatchlistShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this.props.fetchWatchlist(this.props.match.params.watchlistId)
      .then(() => {
        const assetSymbols = Object.values(his.props.watchlist.assets);
        assetSymbols.forEach(symbol => {
          
        })
      })

    // if (this.props.symbolDetails[this.props.match.params.assetSymbol]['isStock']) {
    //   if (!this.props.assets['interval'] || !this.props.assets['interval'][this.state.symbol]) this.props.fetchAssetInterval(this.state.symbol);
    //   if (!this.props.assets['full'] || !this.props.assets['full'][this.state.symbol]) this.props.fetchAssetFull(this.state.symbol);
    //   this.props.fetchAssetDetails(this.state.symbol).then(() => {
    //     this.setState({ loading: false })
    //   });
    // } else {
    //   if (!this.props.assets['interval'] || !this.props.assets['interval'][this.state.symbol]) this.props.fetchCryptoInterval(this.state.symbol);
    //   if (!this.props.assets['full'] || !this.props.assets['full'][this.state.symbol]) this.props.fetchCryptoFull(this.state.symbol);
    //   this.props.fetchAssetDetails(this.state.symbol).then(() => {
    //     this.setState({ loading: false })
    //   });
    // }
  }

  formatDollarString(num) {
    const sign = (num > 0) ? '+' : '-';
    let numberFixed = parseFloat(Math.abs(num).toFixed(2));
    return `${sign}$${numberFixed.toLocaleString("en-US")}`
  }

  render() {
    if (this.state.loading) return <LoadingSpinner />
    return (

      <div className='watchlist-show'>
        <PortfolioHeader logout={this.props.logout} />
        <div>

        </div>
      </div>
    )
  }
}