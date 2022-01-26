import React from 'react';
import { Link } from 'react-router-dom';

export default class AssetListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (!this.props.assets || !this.props.symbol) return null;
    // console.log(this.props.assets[this.props.symbol])
    // console.log(this.props.assets[this.props.symbol]['Global Quote'])
    return (
      <div className=''>
        
        <div>{this.props.symbol}</div>
        <div></div>
        {/* <div>{this.props.assets.symbol}</div> */}
      </div>
    )
  }
}