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
    this.chooseIcon = this.chooseIcon.bind(this);
    this.listener = (e) => {
      const box = document.querySelector('.emoji-box');
      const iconButton = document.getElementById('choose-icon');
      const listIcon = document.querySelector('.watchlist-icon');

      if (!box.contains(e.target) && !iconButton.contains(e.target)) {
        if (listIcon) {
          if (!listIcon.contains(e.target)) $('.emoji-box').addClass('hidden');
        } else {
          $('.emoji-box').addClass('hidden');
        }
      }
    }
    document.addEventListener('mouseup', this.listener);
  }

  componentDidMount() {
    $('#choose-icon').html(this.state.icon);
    this.renderIcons();
  }

  componentDidUpdate() {
    $('#choose-icon').html(this.state.icon);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.listener);
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
        // this.props.fetchWatchlists(this.props.user.id);
        this.setState({ name: '', errors: [], icon: '&#128161' })
      }, () => {
        this.setState({ errors: this.props.errors })
      })
  }

  toggleIconBox() {
    $('.new-list.emoji-box').toggleClass('hidden');
  }

  renderIcons() {
    $('.emoji-box').append(`<span class='emoji'>&#128161</span>`)
    const emojiCodeRanges = [128005, 128063]
    for (let i = emojiCodeRanges[0]; i < emojiCodeRanges[1]; i++) {
      $('.emoji-box').append(`<span class='emoji' id='&#${i}'>&#${i}</span>`) 
    }
  }

  chooseIcon(e) {
    if (e.target.id) {
      $('.emoji-box').addClass('hidden');
      this.setState({ icon: e.target.id})
    }
  }

  render() {
    const errors = (this.state.errors.length) ? <div><i className="fas fa-exclamation-circle"></i> {this.state.errors}</div> : '';
    return (
      <form>
        <div className='mini-watchlist-item create-new-list-form hidden' >
          <div className='new-list-inputs'>
            <div id='choose-icon' className={`changeColor ${this.props.color}`} onClick={this.toggleIconBox}>
            </div>
            <div className='new-list emoji-box hidden' onClick={this.chooseIcon}></div>

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