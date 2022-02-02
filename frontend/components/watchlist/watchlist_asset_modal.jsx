import React from 'react';
import MiniWatchlistItem from './mini_watchlist_item'
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
      name: '',
    }
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleSaveChange = this.handleSaveChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNewListSubmit = this.handleNewListSubmit.bind(this);
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
  
  
  toggleModal() {
    $('.watchlist-asset-modal-div').toggleClass('hidden');
  }
  
  handleNameChange(e) {
    e.preventDefault();
    const name = e.currentTarget.value;
    this.setState({name: name})
  }

  handleNewListSubmit(e) {
    e.preventDefault();
    console.log('in submit')
    this.props.createWatchlist(this.state)
      .then(() => {
        this.componentDidMount()
      }, () => {
        this.setState({ errors: this.props.errors})
      })
  }

  toggleNewListInput(e) {
    e.preventDefault();
    $('.create-new-list-div').toggleClass('hidden');
    $('.create-new-list-form').toggleClass('hidden');
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
            <input type="checkbox" className={this.props.color}id={`${watchlist.id}`} name="watchlists" value={watchlist.id} defaultChecked={this.state.listChecks[watchlist.id]} onChange={this.handleCheckChange}/>
            <MiniWatchlistItem watchlist={watchlist} />
          </label>
        </div>
      )
    })
  }

  componentDidUpdate() {
    $('#choose-icon').html(this.state.icon);
  }

  render() {
    if (this.state.loading) return null;
    console.log('render', this.state)
    let errors = (this.state.errors.length) ? <div><i className="fas fa-exclamation-circle"></i> {this.state.errors}</div> : '';
    return (
      <div className='watchlist-asset-modal-div '>
        <div className='watchlist-asset-modal'>
          
            <div className='list-asset-modal-title'>
              <div>Add {this.props.symbol} to Your Lists</div>
              <div onClick={this.toggleModal} className='close-modal'>&times;</div>
            </div>

            <div className='all-watchlists'>

              <div className='mini-watchlist-item create-new-list-div' onClick={this.toggleNewListInput}>
                <div id='plus-icon' className={this.props.color}>+</div>
                <div className='mini-item-details'>
                  <div>Create New List</div>
                </div>
              </div>

              <form>
                <div className='mini-watchlist-item create-new-list-form' >
                  <div className='new-list-inputs'>
                    <div id='choose-icon' className={this.props.color}></div>
                    <div className='mini-item-details'>
                      <input type="text" placeholder="List Name" className={`${this.props.color} new-list-input`} value={this.state.name} onChange={this.handleNameChange}/>
                    </div>
                  </div>
                  {errors}
                
                  <div className='new-list-button-div'>
                    <button className={`cancel-new-list-button ${this.props.color}`} onClick={this.toggleNewListInput}>Cancel</button>
                    <button className={`create-new-list-button ${this.props.color}`} onClick={this.handleNewListSubmit}>Create List</button>
                  </div>
                </div>
              </form>
            <div className='mini-watchlist-div'>

              {this.renderMiniWatchlist()}
            </div>
            </div>

            {/* <div> */}
            <button className={`asset-modal-button ${this.props.color}`} disabled={!this.state.isChanged} onClick={this.handleSaveChange}>Save Changes</button>
            {/* </div> */}
          
        </div>
      </div>
    )
  }
}