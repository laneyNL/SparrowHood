import React from 'react';
import LoadingSpinner from '../loading_spinner';
import PortfolioHeader from '../portfolio/portfolio_header';

export default class WatchlistShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      // stockSymbols: [],
      // cryptoSymbols: [],
      listSymbolArray: [],
      listSymbolDetails: {}
    }
    console.log(this.props)
  }

  componentDidMount() {
    this.props.fetchWatchlist(this.props.match.params.watchlistId)
      .then(() => {
        const watchlistAssets = Object.values(this.props.watchlist.assets);
        Promise.all(watchlistAssets.map(asset => {
            this.props.fetchAssetDetails(asset.symbol);
            this.props.fetchAssetFull(asset.symbol);
        }))
          .then(() => {
            watchlistAssets.forEach(asset => {
              const assetFullValues = Object.values(this.props.assets.full[asset.symbol]);
              const openPrice = parseFloat(assetFullValues[0]['1. open']);
              const closePrice = parseFloat(assetFullValues[0]['4. close']);
              const percentDiff = ((closePrice-openPrice)/openPrice)*100;
              const symbolObject = {
                symbol: asset.symbol,
                name: this.props.assets.details[asset.symbol]['Name'],
                price: closePrice,
                today: percentDiff,
                marketCap: this.props.assets.details[asset.symbol]['MarketCapitalization'] || '-',
                id: asset.id
              };
              this.state.listSymbolDetails[asset.symbol] = symbolObject;
            })
            this.setState({ listSymbolArray: watchlistAssets.map(asset => asset.symbol), loading: false})
          })
      })
  }

  deleteListAsset(e) {
    this.props.deleteWatchList(this.state.listSymbolDetails['id'])
  }

  convertMarketCap(num) {
    let marketCap = parseInt(num);
    let divisor = 1;
    let endUnit = '';
    if (num > 1000000000000) {
      [divisor, endUnit] = [1000000000000, 'T']
    } else if ( num > 1000000000) {
      [divisor, endUnit] = [1000000000, 'B']
    } else if (num > 1000000) {
      [divisor, endUnit] = [1000000, 'M']
    }
    return `${(marketCap/divisor).toFixed(2)}${endUnit}`
  }

  renderTableRow(symbol) {
    const symbolListDetails = this.state.listSymbolDetails[symbol];
    const marketCap = this.convertMarketCap(symbolListDetails.marketCap);

    return(
      <tr key={symbol}>
        <td>{symbolListDetails.name}</td>
        <td>{symbolListDetails.symbol}</td>
        <td>{symbolListDetails.price}</td>
        <td><div className='caret'></div>{`${symbolListDetails.today.toFixed(2)}%`}</td>
        <td>{marketCap}</td>
        <td>&times;</td>
      </tr>
    )
  }


  render() {
    if (this.state.loading) return <LoadingSpinner />
    return (

      <div className='watchlist-show'>
        <PortfolioHeader logout={this.props.logout} />
        <div>
          <div className='watchlist-main'>
            <div className='watchlist-icon'>Icon Placeholder</div>

            <div className='watchlist-header'>
              <div className='watchlist-table-name'>
                <div>{this.props.watchlist.name}</div>
                <div className='grayText'>{this.state.listSymbolArray.length} items</div>
              </div>

              <div className='watchlist-search-options'>
                Search Options
              </div>
            </div>

            <div className='watchlist-table'>
              <table>
                <tbody>
                  <tr>
                    <th className='watchlist-name-col'>Name</th>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th> Today</th>
                    <th>Market Cap</th>
                    <th></th>
                  </tr>
                  {this.state.listSymbolArray.map(symbol => this.renderTableRow(symbol))}
                </tbody>
              </table>
            </div>

          </div>
          <aside className='watchlist-aside'>

          </aside>
        </div>
      </div>
    )
  }
}