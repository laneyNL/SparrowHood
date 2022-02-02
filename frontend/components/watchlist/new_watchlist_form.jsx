import React from 'react';

export default class NewWatchlistForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: '&#128161',
      errors: [],
      user_id: this.props.user.id,
      name: '',
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNewListSubmit = this.handleNewListSubmit.bind(this);

  }

  handleNameChange(e) {
    e.preventDefault();
    const name = e.currentTarget.value;
    this.setState({ name: name })
  }

  handleNewListSubmit(e) {
    e.preventDefault();
    this.props.createWatchlist(this.state)
      .then(() => {
        this.setState({ name: '', errors: [] })
      }, () => {
        this.setState({ errors: this.props.errors })
      })
  }

  renderEmojis() {
    return (
      <div>

      </div>
    )
  }

  render() {
    const errors = (this.state.errors.length) ? <div><i className="fas fa-exclamation-circle"></i> {this.state.errors}</div> : '';
    return (
      <form>
        <div className='mini-watchlist-item create-new-list-form hidden' >
          <div className='new-list-inputs'>
            <div id='choose-icon' className={`changeColor ${this.props.color}`}></div>
            <div className='mini-item-details'>
              <input type="text" placeholder="List Name" className={`${this.props.color} changeColor new-list-input`} value={this.state.name} onChange={this.handleNameChange} />
            </div>
          </div>
          {errors}

          <div className='new-list-button-div'>
            <button className={`cancel-new-list-button changeColor ${this.props.color}`} onClick={this.props.toggleNewListInput}>Cancel</button>
            <button className={`create-new-list-button changecolor ${this.props.color}`} onClick={this.handleNewListSubmit}>Create List</button>
          </div>
        </div>
      </form>
    )
  }
}