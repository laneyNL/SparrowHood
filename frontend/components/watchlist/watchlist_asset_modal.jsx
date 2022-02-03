import React from 'react';
import MiniWatchlistItem from './mini_watchlist_item'
import NewWatchlistFormContainer from './new_watchlist_form_container';
export default class WatchlistAssetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      listChecks: {},
      originalChecks: {},
      isChanged: false,
      assetId: {},
      icon: '&#128161',
      errors: [],
      user_id: this.props.user.id,
      name: ''
    }
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleSaveChange = this.handleSaveChange.bind(this);
    this.listener = (e) => {
      const modal = document.querySelector('.watchlist-asset-modal');
      if (!modal.contains(e.target)) {
        $('.watchlist-asset-modal-div').addClass('hidden');
      }
    }
    document.addEventListener('mouseup', this.listener);
  }

  componentDidMount() {
    $('#choose-icon').html(this.state.icon);
    this.state.assetId = {};
    this.props.fetchWatchlists(this.props.user.id).then(()=> {
      const watchlistValues = Object.values(this.props.watchlists);
      watchlistValues.forEach(value => {
        if (jQuery.isEmptyObject(value.assets)) this.state.listChecks[value.id] = false;
        Object.values(value.assets).forEach(asset => {
          if (asset.symbol === this.props.symbol) {
            this.state.listChecks[value.id] = true;
            this.state.assetId[value.id] = asset.id;
          } else {
            this.state.listChecks[value.id] = false;
          }
        });
      })
  
      this.setState({loading: false, originalChecks: this.state.listChecks, isChanged: false })
    })
  }

  componentDidUpdate(prevProps) {
    if (Object.keys(prevProps.watchlists).length !== Object.keys(this.props.watchlists).length) {
      this.componentDidMount();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.listener);
  }
  
  toggleModal() {
    $('.watchlist-asset-modal-div').toggleClass('hidden');
  }
  
  toggleNewListInput(e) {
    e.preventDefault();
    $('.create-new-list-div').toggleClass('hidden');
    $('.create-new-list-form').toggleClass('hidden');
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
    Promise.all(Object.keys(this.state.originalChecks).map(listId => {
      if (this.state.originalChecks[listId] !== this.state.listChecks[listId]) {
        if (this.state.assetId[listId]) {
          return this.props.deleteWatchlistAsset(this.state.assetId[listId], listId);
        } else {
          return this.props.createWatchlistAsset({ watchlist_id: listId, symbol: this.props.symbol })
        }
      }
    }))
      .then(() => {
        this.toggleModal();
        this.componentDidMount();
      })
    
  }

  renderMiniWatchlist() {
    return Object.values(this.props.watchlists).map(watchlist => {
      return (
        <div key={watchlist.id}>
          <label className='mini-watchlist-input'>
            <input type="checkbox" className={`changeColor ${this.props.color}`} id={`${watchlist.id}`} name="watchlists" value={watchlist.id} defaultChecked={this.state.listChecks[watchlist.id]} onChange={this.handleCheckChange}/>
            <MiniWatchlistItem watchlist={watchlist} />
          </label>
        </div>
      )
    })
  }

  render() {
    if (this.state.loading) return null;
    
    return (
      <div className='watchlist-asset-modal-div hidden'>
        <div className='watchlist-asset-modal'>
          
            <div className='list-asset-modal-title'>
              <div>Add {this.props.symbol} to Your Lists</div>
              <div onClick={this.toggleModal} className='close-modal'>&times;</div>
            </div>

            <div className='all-watchlists'>

              <div className='mini-watchlist-item create-new-list-div' onClick={this.toggleNewListInput}>
                <div id='plus-icon' className={`changeColor ${this.props.color}`}>+</div>
                <div className='mini-item-details'>
                  <div>Create New List</div>
                </div>
              </div>
            <NewWatchlistFormContainer color={this.props.color} toggleNewListInput={this.toggleNewListInput} />
              
            <div className='mini-watchlist-div'>

              {this.renderMiniWatchlist()}
            </div>
            </div>

            {/* <div> */}
          <button className={`asset-modal-button changeColor ${this.props.color}`} disabled={!this.state.isChanged} onClick={this.handleSaveChange}>Save Changes</button>
            {/* </div> */}
          
        </div>
      </div>
    )
  }
}