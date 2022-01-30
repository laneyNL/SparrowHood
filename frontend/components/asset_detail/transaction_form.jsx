import React from 'react';

export default class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    const assetValues = Object.values(this.props.assets[this.props.symbol]);
    this.state = {
      owner_id: this.props.user.id,
      asset_id: '',
      is_purchase: '',
      quantity: '',
      transaction_price: '',
      symbol: this.props.symbol,
      is_stock: '',
      currentPrice: assetValues[0]["4. close"],
      initialPrice: assetValues[assetValues.length-1]["4. close"],
      color: 'green',
      transaction_type: 'buy',
      transaction_unit: 'shares'
    }

  }

  componentDidMount() {
    this.setState({ color: 'red'})
  }

  handleClick(field) {
    return (e) => {
      this.setState({ transaction_type: field})
    }
  }

  onChange() {

  }

  handleSubmit() {

  }

  renderSharesForm () {
    return (
    <div>
      <div className='transaction-form-selections' id='transaction-unit'>
        <span>Shares</span>
        <span><input type="text" placeholder='0' id='transaction-unit-input' /></span>
      </div>

      <div className='transaction-form-selections'>
        <span>Market Price</span>
        <span>Price</span>
      </div>

      <div className='transaction-confirmation'>
        <div className='transaction-form-selections'>
          <span>Estimated Cost</span>
          <span>Price</span>
        </div>
        <button className='transaction-button'>Review Order</button>
      </div>
    </div>
    )
  }

  renderDollarsForm () {
    return (
    <div>
      <div className='transaction-form-selections' id='transaction-unit'>
        <span>Amount</span>
        <span><input type="text" placeholder='$0.00' id='transaction-unit-input' /></span>
      </div>

      <div className='transaction-confirmation'>
        <div className='transaction-form-selections'>
          <span>Est.Quantity</span>
          <span>Price</span>
        </div>
        <button className='transaction-button'>Review Order</button>
      </div>
    </div>
    )
  }

  render() {
    const formEnd = this.state.transaction_unit === 'share' ? 
      this.renderSharesForm() : this.renderDollarsForm()
    return (
      <aside className='transaction-form-container'>
        <form className='transaction-form'>
          <div className='transaction-options'>
            <div  id='buy-option' onClick={this.handleClick('buy')}>Buy {this.props.symbol}</div>
            <div id='sell-option' onClick={this.handleClick('sell')}>Sell {this.props.symbol}</div>
          </div>
          <div className='transaction-form-body'>
            <div className='transaction-form-selections'><span>Order Type</span><span>Market Order</span></div>
            <div className='transaction-form-selections'>
              <label htmlFor="unit-value">Invest In</label>
              <select id="unit-value">
                <option value="shares" className='unit-value-input'>Shares</option>
                <option value="dollars" className='unit-value-input'>Dollars</option>
              </select>
            </div>
            {formEnd}
          </div>
          <div className='transaction-form-buy-power'>{ } buying power available</div>
        </form>
      </aside>
    )
  }
}