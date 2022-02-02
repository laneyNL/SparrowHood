import React from 'react';
import MiniWatchlistItem from './mini_watchlist_item'
export default class WatchlistAssetModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      // watchlistAssets: {},
      listChecks: {},
      originalChecks: {},
      isChanged: false,
      assetId: {}
    }
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleSaveChange = this.handleSaveChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchWatchlists(this.props.user.id).then(()=> {
      const watchlistValues = Object.values(this.props.watchlists);
      watchlistValues.forEach(value => {
        Object.values(value.assets).forEach(asset => {
          if (asset.symbol === this.props.symbol) {
            this.state.listChecks[value.id] = true;
            this.state.assetId[value.id] = asset.id;
          }
        });
      })
  
      this.setState({loading: false, originalChecks: this.state.listChecks })
    })
  }
  
  handleNewForm() {

  }

  toggleNewListInput() {

  }

  renderNewListForm() {

  }

  renderEmojis() {
    return (
      <div>

      </div>
    )
  }

  handleCheckChange(e) {
    let newListCheck = Object.assign({}, this.state.listChecks);
    newListCheck[e.target.value] = !this.state.listChecks[e.target.value]
    let isChanged = false;
    Object.keys(this.state.originalChecks).forEach(listId => {
      if (this.state.originalChecks[listId] !== newListCheck[listId]) {
        isChanged = true;
      }
    })
    this.setState({ listChecks: newListCheck, isChanged: isChanged })
  }

  handleSaveChange() {
    Object.keys(this.state.originalChecks).forEach(listId => {
      if (this.state.originalChecks[listId] !== this.state.listChecks[listId]) {
        if (this.state.assetId[listId]) {
          this.props.deleteWatchlistAsset(this.state.assetId[listId], listId);
        } else {
          this.props.createWatchlistAsset({ watchlist_id: listId, symbol: this.props.symbol })
        }
      }
    });
  }

  renderMiniWatchlist() {
    return Object.values(this.props.watchlists).map(watchlist => {
      return (
        <div key={watchlist.id}>
          <label className='mini-watchlist-input'>
            <input type="checkbox" className={this.props.color}id={`${watchlist.id}`} name="watchlists" value={watchlist.id} defaultChecked={this.state.listChecks[watchlist.id]} onChange={this.handleCheckChange}/>
            <MiniWatchlistItem watchlist={watchlist} />
          </label>
        </div>
      )
    })
  }

  render() {
    if (this.state.loading) return null;
    console.log('render', this.state)
    return (
      <div className='watchlist-asset-module-div'>  
        <div className='watchlist-asset-module'>
          <div className='list-asset-module-title'>
            <div>Add {this.props.symbol} to Your Lists</div>
            <div>&times;</div>
          </div>

          <div className='all-watchlists'>

            <div className='mini-watchlist-item create-new-list-div'>
              <div id='plus-icon' className={this.props.color}>+</div>
              <div className='mini-item-details'>
                <div>Create New List</div>
              </div>
            </div>

            {this.renderMiniWatchlist()}
          </div>

          {/* <div> */}
          <button className={`asset-module-button ${this.props.color}`} disabled={!this.state.isChanged} onClick={this.handleSaveChange}>Save Changes</button>
          {/* </div> */}

        </div>
      </div>
    )
  }
}