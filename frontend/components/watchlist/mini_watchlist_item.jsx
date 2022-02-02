import React from 'react';

export default class MiniWatchlistItem extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {

  }


  render() {
    console.log(this.props.watchlist)
    const assetLength = Object.keys(this.props.watchlist.assets).length;
    const itemLength = assetLength > 9 ? `${assetLength} itemLength` : `${assetLength} item`;
    return (
      <div className='mini-watchlist-item'>
        <div>Icon</div>
        <div>
          <div>{this.props.watchlist.name}</div>
          <div className='mini-watchlist-itemLength'>{itemLength}</div>
        </div>
      </div>
    )
  }
}