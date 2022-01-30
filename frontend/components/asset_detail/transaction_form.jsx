import React from 'react';

export default class TransactionForm extends React.Component {
  constructor(props) {
    super(props);

    const assetValues = Object.values(this.props.assets['interval'][this.props.symbol]);
    this.state = {
      owner_id: this.props.user.id,
      asset_id: '',
      is_purchase: '',
      quantity: '',
      transaction_price: '',
      symbol: this.props.symbol,
      is_stock: '',
      currentPrice: parseFloat(assetValues[0]["4. close"]),
      initialPrice: parseFloat(assetValues[assetValues.length-1]["4. close"]),
      color: 'green',
      transaction_type: 'buy',
      transaction_unit: 'shares',
      isSubmitted: false
    }
    this.handleReturnClick = this.handleReturnClick.bind(this);
  }

  componentDidMount() {
    this.setState({ color: 'red'})
  }

  handleClick(field) {
    return (e) => {
      this.setState({ transaction_type: field})
    }
  }

  update(field) {
    return (e) => {
      let quantity = parseFloat(e.currentTarget.value);
      if (isNaN(quantity)) return;
      if (field === 'quantity') quantity /= this.state.currentPrice;
      if (this.state.transaction_type === 'sell') quantity = -quantity;
      this.setState({ [field]:  quantity})
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createTransaction(this.state)
      .then( () => this.setState({ isSubmitted: true }))
  }

  renderSharesForm () {
    return (
    <div>
      <div className='transaction-form-selections' id='transaction-unit'>
        <span>Shares</span>
        <span><input type="text" placeholder='0' id='transaction-unit-input' onChange={this.update('quantity')}/></span>
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
          <span><input type="text" placeholder='$0.00' id='transaction-unit-input' onChange={this.update('dollars')}/></span>
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

  handleReturnClick(e) {
    e.preventDefault();
    this.setState({ isSubmitted: false });
  }

  renderPurchase() {
    const purchaseTotal = (this.state.quantity * this.state.currentPrice).toFixed(2);
    return(
      <aside className='transaction-form-container'>
        <div className='transaction-form'>
          <div className='border-bottom'>
            <div>{this.props.symbol} Order Completed</div>
          </div>
          <div className='transaction-form-body'>
            <div className='transaction-form-selections'>
              <span>Amount Invested</span>
              <span>{purchaseTotal}</span>
            </div>
            <div className='transaction-form-body'>
              <span>Esimated Shares</span>
              <span>{this.state.quantity.toFixed(10)}</span>
            </div>
            <div>Your order to market buy {purchaseTotal} of {this.props.symbol} was completed.</div>
            <button className='transaction-button' onClick={this.handleReturnClick}>Done</button>
          </div>
        </div>
      </aside>
    )
  }

  render() {
    if (this.state.isSubmitted) return renderPurchase();
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