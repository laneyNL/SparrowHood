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
      is_stock: '',
      color: 'green'
    }

  }

  componentDidMount() {
    this.setState({ color: 'red'})
  }

  onChange() {

  }

  handleSubmit() {

  }

  render() {

    return (
      <aside className='asset-list transaction-form-container'>
        <form className='transaction-form'>
          <div className='transaction-options'>
            <div  id='buy-option'>Buy {this.props.symbol}</div>
            <div id='sell-option'>Sell {this.props.symbol}</div>
          </div>
          <div className='border-bottom'>
            <div className='flex-between'><span>Order Type</span><span>Market Order</span></div>
            <div className='flex-between'>
              <label forHTML="unit-value">Invest In</label>
              <select id="unit-value">
                <option value="shares" className='unit-value-input'>Shares</option>
                <option value="dollars" className='unit-value-input'>Dollars</option>
              </select>
            </div>
            <div className='flex-between' id='transaction-unit'><span>Shares</span><span><input type="text" placeholder='0' id='transaction-unit-input'/></span></div>
            <div className='flex-between'><span>Market Price</span><span>Price</span></div>
          </div>
          <div>
            <div className='flex-between'><span>Estimated Cost</span><span>Price</span></div>
            <button className='transaction-button'>Review Order</button>
          </div>
          <div>{ } buying power available</div>
        </form>
      </aside>
    )
  }
}