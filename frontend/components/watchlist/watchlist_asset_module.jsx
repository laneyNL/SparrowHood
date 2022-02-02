import React from 'react';
import MiniWatchlistItem from './mini_watchlist_item'
export default class WatchlistAssetModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    this.props.fetchWatchlists(this.props.user.id).then(()=> {
      this.setState({loading: false })
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

  renderMiniWatchlist() {
    return Object.values(this.props.watchlists).map(watchlist => {
      return (
        <div key={watchlist.id}>
          <label className='mini-watchlist-input'>
            <input type="checkbox" id={`${watchlist.id}`} name="watchlists" value={watchlist.id} />
            <MiniWatchlistItem watchlist={watchlist} />
          </label>
        </div>
      )
    })
  }

  render() {
    if (this.state.loading) return null;
    return (
      <div className='watchlist-asset-module-div'>  
        <div className='watchlist-asset-module'>
          <div className='list-asset-module-title'>
            <div>Add {this.props.symbol} to Your Lists</div>
            <div>&times;</div>
          </div>

          <div className='all-watchlists'>

            <div className='mini-watchlist-item create-new-list-div'>
              <div id='plus-icon'>+</div>
              <div className='mini-item-details'>
                <div>Create New List</div>
              </div>
            </div>

            {this.renderMiniWatchlist()}
          </div>

          {/* <div> */}
            <button className='asset-module-button'>Save Changes</button>
          {/* </div> */}

        </div>
      </div>
    )
  }
}