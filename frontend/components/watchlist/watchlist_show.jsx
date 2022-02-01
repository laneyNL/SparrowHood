import React from 'react';
import LoadingSpinner from '../loading_spinner';
import PortfolioHeader from '../portfolio/portfolio_header';

export default class WatchlistShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stockSymbols: [],
      cryptoSymbols: [],
    }
    console.log(this.props)
  }

  componentDidMount() {
    this.props.fetchWatchlist(this.props.match.params.watchlistId)
      .then(() => {
        const assetSymbols = Object.values(this.props.watchlist.assets).map(asset => asset.symbol);
        Promise.all(assetSymbols.map(symbol => {
            if (!this.props.assets['details'] || !this.props.assets['details'][symbol]) {
              this.props.fetchAssetDetails(symbol);
            }
        }))
          .then(() => {
            this.setState({
              stockSymbols: assetSymbols,
              // stockSymbols: assetSymbols.filter(symbol => this.props.symbolDetails[symbol].isStock),
              // cryptoSymbols: assetSymbols.filter(symbol => !this.props.symbolDetails[symbol].isStock),
            })

            let unfetchedSymbols = this.state.stockSymbols;
            let unfectchedCryptos = this.state.cryptoSymbols;

            if (this.props.assets['full']) {
              unfetchedSymbols = unfetchedSymbols.filter(symbol => !this.props.assets['full'][symbol]);
              unfectchedCryptos = unfectchedCryptos.filter(symbol => !this.props.assets['full'][symbol]);
            }

            Promise.all(unfetchedSymbols.map(symbol =>
              this.props.fetchAssetFull(symbol)))
              .then(() => {
                Promise.all(unfectchedCryptos.map(symbol => this.props.fetchCryptoFull(symbol)))
                  .then(() => this.setState({ loading: false }))
              })


          })
      })
    setTimeout(() => {
      if (this.state.loading) this.setState({ loading: false });
    }, 10000);
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