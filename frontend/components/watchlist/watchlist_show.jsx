import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../loading_spinner';
import PortfolioHeader from '../portfolio/portfolio_header';
import MiniWatchlistItem from './mini_watchlist_item';

export default class WatchlistShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: '',
      listSymbolArray: [],
      listSymbolDetails: {},
      id: '',
      icon: '&#128161',
      errors: [],
      user_id: this.props.user.id,
      name: '',
    }
    this.deleteListAsset = this.deleteListAsset.bind(this);
    this.sortTable = this.sortTable.bind(this);
    this.sortArray = this.sortArray.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteWatchlist = this.deleteWatchlist.bind(this);
  }

  componentDidMount() {
    this.props.fetchWatchlists(this.props.user.id)
      .then(() => {
        const watchlistAsset = this.props.watchlist.assets;
        Promise.all(Object.values(watchlistAsset).map(asset => {
            this.props.fetchAssetDetails(asset.symbol);
            this.props.fetchAssetFull(asset.symbol);
        }))
          .then(() => {
            for (const id in watchlistAsset) {
              const asset = watchlistAsset[id];
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
                id: id
              };
              this.state.listSymbolDetails[asset.symbol] = symbolObject;
            }
            this.setState({ listSymbolArray: Object.values(watchlistAsset).map(asset => asset.symbol), name: this.props.watchlist.name, id: this.props.match.params.watchlistId, loading: false})

            $('#input-list-name').focusout((e) => {
              this.handleSumbit(e);
            });
          })
      })

    
  }

  handleChange(e) {
    const newName = e.currentTarget.value;
    this.setState({ name: newName })
  }

  handleSumbit(e) {
    e.preventDefault();
    this.props.updateWatchlist(this.state);
  }

  deleteWatchlist(e) {
    return this.props.deleteWatchlist(this.state.id)
      .then(() => this.props.history.push('/'))
  }

  toggleConfirmDelete() {
    return $('.confirm-delete-div').toggleClass('hidden');
  }

  deleteListAsset(symbol) {
    return( e => {
      this.props.deleteWatchlistAsset(this.state.listSymbolDetails[symbol]['id'], this.state.id)
        .then(() => {
          this.setState({ listSymbolArray: Object.values(this.props.watchlist.assets).map(asset => asset.symbol) })
        })
    })
  }

  sortTable(column) {
    return (e) => {
      let isReversed;
      // const jqueryId = `#${column}`;
      $(`.sort-caret`).html('');
      if ($(`#${column}`).hasClass('sort')) {
        $(`#${column}`).removeClass('sort');
        $(`#${column}`).addClass('reverse');
        $(`.sort-caret.${column}`).html('<i class="fas fa-angle-down"></i>');
        isReversed = true;
      } else if ($(`#${column}`).hasClass('reverse')) {
        $('.watchlist-sort-columns').removeClass('reverse');
        this.setState({ listSymbolArray: Object.values(this.props.watchlist.assets).map(asset => asset.symbol)})
        return;
      } else {
        $('.watchlist-sort-columns').removeClass('reverse');
        $('.watchlist-sort-columns').removeClass('sort');
        $(`#${column}`).addClass('sort');
        $(`.sort-caret.${column}`).html('<i class="fas fa-angle-up"></i>');
        isReversed = false;
      }
      const sortedSymbolArray = this.sortArray(this.state.listSymbolArray.slice(), column, isReversed);
      this.setState({ listSymbolArray: sortedSymbolArray});
    }
  }

  sortCallback(item1, item2, column) {
    if (column === 'name' || column === 'symbol') {
      if (item1 > item2) return 1;
      if (item1 < item2) return -1;
      return 0;
    } else {
      if (parseFloat(item1) > parseFloat(item2)) return 1;
      if (parseFloat(item1) < parseFloat(item2)) return -1;
      return 0;
    }
  }

  sortArray(symbolArray, column, isReversed) {
    if (symbolArray.length <= 1) return symbolArray;
    const symbolDetails = this.state.listSymbolDetails;
    const sortCallback = this.sortCallback;
    let pivot = symbolArray[0];
    let left = this.sortArray(symbolArray.slice(1).filter(symbol => sortCallback(symbolDetails[pivot][column], symbolDetails[symbol][column], column) === 1), column, isReversed)
    let right = this.sortArray(symbolArray.slice(1).filter(symbol => sortCallback(symbolDetails[pivot][column], symbolDetails[symbol][column], column) !== 1), column, isReversed)

    if (isReversed) return right.concat([pivot], left);
    return left.concat([pivot], right);
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

  componentDidUpdate(prevProps) {
    $(`#watchlist-icon-${this.state.id}`).html(this.props.watchlist.icon);
    if (prevProps.match.params.watchlistId !== this.props.match.params.watchlistId) {
      this.componentDidMount();
    }
  }

  renderTableRow(symbol) {
    const symbolListDetails = this.state.listSymbolDetails[symbol];
    const marketCap = this.convertMarketCap(symbolListDetails.marketCap);
    const direction = symbolListDetails.today > 0 ? 'up' : 'down';
    return(
      <tr key={symbol}>
        <td>{symbolListDetails.name}</td>
        <td>{symbolListDetails.symbol}</td>
        <td>{`$${symbolListDetails.price}`}</td>
        <td><span><span className={`caret ${direction}`}></span> {`${symbolListDetails.today.toFixed(2)}%`}</span></td>
        <td >{marketCap}</td>
        <td onClick={this.deleteListAsset(symbolListDetails.symbol)} className='delete-watchlist-asset'>&times;</td>
      </tr>
    )
  }

  renderConfirmDelete() {
    return (
      <div className='confirm-delete-div hidden'>
        <div className='confirm-delete'>
          <div className='delete-question'>
            <span>Are you sure you want to delete "{this.state.name}"?</span>
            <span onClick={this.toggleConfirmDelete} className='close-delete'>&times;</span>
          </div><br />
          <div>If you delete this list and its {this.state.listSymbolArray.length} items, it'll be gone forever!</div><br />
          <button className='delete-button' onClick={this.deleteWatchlist}>Delete {this.state.name}</button>
        </div>
      </div>
    )
  }

  render() {
    if (this.state.loading) return <LoadingSpinner clearErrors={this.props.clearErrors} errors={this.props.errors} history={this.props.history}/>

    const emptyTable = (this.state.listSymbolArray.length > 0) ?  '' : 
      <div className='empty-table'>
        <div className='empty-table-title'>Feels a little empty in here...</div>
        <div className='empty-table-text'>Search for companies to add and stay up to date.</div>
      </div>;
    return (

      <div className='watchlist-show'>
        {this.renderConfirmDelete()}
        <PortfolioHeader logout={this.props.logout} />
        <div className='watchlist-body'>
          <div className='watchlist-main'>
            <div className='watchlist-icon' id={`watchlist-icon-${this.state.id}`}></div>

            <div className='watchlist-header'>
              <div className='watchlist-table-title'>
                <input type="text" className='watchlist-table-name' value={this.state.name} onChange={this.handleChange} id='input-list-name' placeholder='Edit List Name'/>
                <div className='watchlist-table-count'>{this.state.listSymbolArray.length} items</div>
              </div>

              <div className='watchlist-sort-options'>
                {/* <span><i className="fas fa-filter filter-icon"></i></span>  */}
                <span onClick={this.toggleConfirmDelete} ><i className="fas fa-ellipsis-h filter-icon"></i></span>
              </div>
            </div>

            <div className='watchlist-table'>
              <table>
                <tbody>
                  <tr className='table-header'>
                    <th id='name' className='watchlist-name-col watchlist-sort-columns' onClick={this.sortTable('name')}>
                      <span>Name</span>
                      <span className={`sort-caret name`}></span>
                    </th>

                    <th id='symbol' className='watchlist-sort-columns' onClick={this.sortTable('symbol')}>
                      <span>Symbol</span>
                      <span className={`sort-caret symbol`}></span>
                    </th>

                    <th id='price' className='watchlist-sort-columns' onClick={this.sortTable('price')}>
                      <span>Price</span>
                      <span className={`sort-caret price`}></span>
                    </th>

                    <th id='today' className='watchlist-sort-columns' onClick={this.sortTable('today')}>
                      <span>Today</span>
                      <span className={`sort-caret today`}></span>
                    </th>

                    <th id='marketCap' className='watchlist-cap-col watchlist-sort-columns' onClick={this.sortTable('marketCap')}>
                      <span>Market Cap</span>
                      <span className={`sort-caret marketCap`}></span>
                    </th>
                    
                    <th></th>
                  </tr>
                  {this.state.listSymbolArray.map(symbol => this.renderTableRow(symbol))}
                </tbody>
              </table>
            </div>
            {emptyTable}
          </div>
          <aside className='watchlist-aside'>
            <div className='watchlist-aside-title'><span>Lists</span><span>+</span></div>
            <div className='all-list-names'>

              {/* <form>
                <div className='mini-watchlist-item create-new-list-form' >
                  <div className='new-list-inputs'>
                    <div id='choose-icon' className='green'></div>
                    <div className='mini-item-details'>
                      <input type="text" placeholder="List Name" className={`$'green' new-list-input`} value={this.state.name} onChange={this.handleNameChange} />
                    </div>
                  </div>
                  {errors}

                  <div className='new-list-button-div'>
                    <button className={`cancel-new-list-button ${this.props.color}`} onClick={this.toggleNewListInput}>Cancel</button>
                    <button className={`create-new-list-button ${this.props.color}`} onClick={this.handleNewListSubmit}>Create List</button>
                  </div>
                </div>
              </form> */}

              {
                Object.values(this.props.watchlists).map((watchlist) =>
                  <Link to={`/watchlist/${watchlist.id}`} key={watchlist.id}><MiniWatchlistItem watchlist={watchlist} /></Link>
                )
              }
            </div>
          </aside>
        </div>
      </div>
    )
  }
}