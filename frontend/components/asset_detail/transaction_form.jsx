import React from 'react';

export default class TransactionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner_id: this.props.user.id,
      asset_id: 10,
      is_purchase: true,
      quantity: '',
      transaction_price: this.props.currentPrice,
      symbol: this.props.symbol,
      is_stock: this.props.isStock,
      color: 'green',
      transaction_unit: 'shares',
      isSubmitted: false,
      valueOwned: (this.props.currentPrice * this.props.quantityOwned).toFixed(2).toLocaleString("en-US"),
      textColor: this.props.sign === '+' ? 'green' : 'red'
    }
    this.handleReturnClick = this.handleReturnClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ color: 'red'})
  }

  handleClick(field) {
    return (e) => {
      e.preventDefault();
      const isPurchase = (field === 'buy') ? true : false;
      this.setState({ is_purchase: isPurchase});
    }
  }

  update(field) {
    return (e) => {
      let quantity = parseFloat(e.currentTarget.value);
      if (!isNaN(quantity)) {
        if (field === 'dollars') quantity /= this.props.currentPrice;
        if (!this.state.is_purchase) quantity = -quantity;
        this.setState({ [field]: quantity });
      }
    }
  }
  handleSelect(e) {
    this.setState({ transaction_unit: e.currentTarget.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createTransaction(this.state)
      .then( () => this.setState({ isSubmitted: true }))
  }

  renderSharesForm () {
    let estCost = '$0.00';
    if (this.state.quantity) estCost = Math.abs((this.state.quantity * this.props.currentPrice).toFixed(2).toLocaleString("en-US"));
    
    return (
    <div>
      <div className='transaction-form-selections' id='transaction-unit'>
        <span>Shares</span>
        <span><input type="text" placeholder='0' id='transaction-unit-input' onChange={this.update('quantity')}/></span>
      </div>

      <div className='transaction-form-selections'>
        <span>Market Price</span>
        <span>{this.props.currentPrice}</span>
      </div>

      <div className='transaction-confirmation'>
        <div className='transaction-form-selections'>
          <span>{this.state.is_purchase ? 'Estimated Cost' : 'Estimated Credit'}</span>
          <span>{estCost}</span>
        </div>
          <button className={`changeColor transaction-button ${this.state.textColor}`}>Review Order</button>
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
          <span>{this.state.quantity}</span>
        </div>
          <button className={`changeColor transaction-button ${this.state.textColor}`}>Review Order</button>
      </div>
    </div>
    )
  }

  handleReturnClick(e) {
    e.preventDefault();
    this.setState({ isSubmitted: false });
  }

  renderPurchase() {
    const purchaseTotal = (this.state.quantity * this.props.currentPrice).toFixed(2);

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
            <button className={`changeColor transaction-button ${this.state.textColor}`} onClick={this.handleReturnClick}>Done</button>
          </div>
        </div>
      </aside>
    )
  }

  renderAvailable() {
    let available;
    const buyingPower = parseFloat(this.props.user.buyingPower).toFixed(2).toLocaleString("en-US");
    if (this.state.is_purchase) {
      available = `$${buyingPower} buying power available`;
    } else if (this.state.transaction_unit === 'shares') {
      available = `${this.props.quantityOwned} Shares Available`;
    } else if (this.state.transaction_unit === 'dollars') {
      available = `${this.state.valueOwned} Available`;
    }

    return <div className={`transaction-form-buy-power colorChange ${this.state.textColor}`}>{available}</div>
  }

  render() {
    console.log('render', this.state);
    if (this.state.isSubmitted) return renderPurchase();
    const formEnd = (this.state.transaction_unit === 'shares') ? 
      this.renderSharesForm() : this.renderDollarsForm()
    const hoverColor = `${this.state.textColor}Text`;
    return (
      <aside className='transaction-form-container'>
        <form className='transaction-form' onSubmit={this.handleSubmit}>
          <div className='transaction-options'>
            <div className={`changeColor purchase-option ${this.state.textColor} ${hoverColor}`} id='buy-option' onClick={this.handleClick('buy')}>Buy {this.props.symbol}</div>
            <div className='changeColor purchase-option ${hoverColor}' id='sell-option' onClick={this.handleClick('sell')}>Sell {this.props.symbol}</div>
          </div>
          <div className='transaction-form-body'>
            <div className='transaction-form-selections'><span>Order Type</span><span>Market Order</span></div>
            <div className='transaction-form-selections'>
              <label htmlFor="unit-value">Invest In</label>
              <select id="unit-value" onChange={this.handleSelect} value={this.state.transaction_unit}>
                <option value="shares" className='unit-value-input'>Shares</option>
                <option value="dollars" className='unit-value-input'>Dollars</option>
              </select>
            </div>
            {formEnd}
          </div>
          {this.renderAvailable()}
        </form>
      </aside>
    )
  }
}