import React from 'react';

export default class MiniWatchlistItem extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    $('#mini-icon').html(this.props.watchlist.icon)
  }
  componentDidUpdate() {
    $('#mini-icon').html(this.props.watchlist.icon)
  }

  render() {
    const assetLength = Object.keys(this.props.watchlist.assets).length;
    const itemLength = assetLength === 1 ? `${assetLength} item` : `${assetLength} items`;
    const icon =128161
    return (
      <div className='mini-watchlist-item'>
        <div id='mini-icon'></div>
        <div className='mini-item-details'>
          <div className='mini-watchlist-name'>{this.props.watchlist.name}</div>
          <div className='mini-watchlist-itemLength'>{itemLength}</div>
        </div>
      </div>
    )
  }
}