import React from 'react';

export default class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner_id: this.props.user.id,
      asset_id: '',
      is_purchase: '',
      quantity: '',
      transaction_price: '',
      symbol: this.props.symbol,
      is_stock: ''
    }
  }

  onChange() {

  }

  handleSubmit() {

  }

  render() {

    return (
      <aside className='asset-list '>
        <form action="">
          <div>
            <div>Buy {this.props.symbol}</div>
            <div>Sell {this.props.symbol}</div>
          </div>
          <div>
            <div className='flex-between'><span>Order Type</span><span>Market Order</span></div>
            <div className='flex-between'><span>Invest In</span><span>Dropdown</span></div>
            <div className='flex-between'><span>Shares</span><span><input type="text" placeholder='0' /></span></div>
            <div className='flex-between'><span>Market Price</span><span>Price</span></div>
          </div>
          <div>
            <div className='flex-between'><span>Estimated Cost</span><span>Price</span></div>
            <button className='review-button'>Review Order</button>
          </div>
          <div>{ } buying power available</div>
        </form>
      </aside>
    )
  }
}