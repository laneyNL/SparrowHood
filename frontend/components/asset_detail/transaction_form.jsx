import React from 'react';

export default class TransactionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner_id: this.props.user.id,
      is_purchase: true,
      quantity: '',
      dollars: '',
      transaction_price: this.props.currentPrice,
      symbol: this.props.symbol,
      is_stock: this.props.isStock,
      transaction_unit: 'shares',
      isSubmitted: false,
      valueOwned: this.formatDollarString((this.props.currentPrice * this.props.quantityOwned)),
      textColor: this.props.sign === '+' ? 'greenText' : 'redText'
    }
    this.handleReturnClick = this.handleReturnClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(field) {
    return (e) => {
      e.preventDefault();
      $('.purchase-option').removeClass('active');
      e.currentTarget.classList.add('active');
      const isPurchase = (field === 'buy') ? true : false;
      this.setState({ is_purchase: isPurchase});
    }
  }

  update(field) {
    return (e) => {
      let dollars;
      let quantity;
      if (field === 'dollars') {
        dollars = parseFloat(e.currentTarget.value);
        quantity = dollars/this.props.currentPrice;
      } else {
        quantity = parseFloat(e.currentTarget.value);
        dollars = quantity * this.props.currentPrice;
      }
      if (!this.state.is_purchase) {
        quantity = -quantity;
        dollars = -dollars;
      }
      this.setState({ quantity: quantity, dollars: dollars });
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

  handleReturnClick(e) {
    e.preventDefault();
    this.setState({ isSubmitted: false });
  }

  formatDollarString(num) {
    return parseFloat(num.toFixed(2)).toLocaleString("en-US");
  }

  renderSharesForm () {
    let estCost = '$0.00';
    if (this.state.quantity) estCost = this.formatDollarString(Math.abs((this.state.quantity * this.props.currentPrice)));
    
    return (
    <div>
      <div className='transaction-form-selections' id='transaction-unit'>
        <span>Shares</span>
        <span><input type="number" placeholder='0' id='transaction-unit-input' onChange={this.update('quantity')} required value={Math.abs(this.state.quantity)}/></span>
      </div>

      <div className='transaction-form-selections'>
        <span>Market Price</span>
        <span>{`$${this.props.currentPrice.toFixed(2)}`}</span>
      </div>

      <div className='transaction-confirmation'>
        <div className='transaction-form-selections'>
          <span>{this.state.is_purchase ? 'Estimated Cost' : 'Estimated Credit'}</span>
          <span>{estCost}</span>
        </div>
      </div>
    </div>
    )
  }

  renderDollarsForm () {
    return (
    <div>
      <div className='transaction-form-selections' id='transaction-unit'>
        <span>Amount</span>
          <span><input type="number" placeholder='$0.00' id='transaction-unit-input' onChange={this.update('dollars')} required value={Math.abs(this.state.dollars)}/></span>
      </div>

      <div className='transaction-confirmation'>
        <div className='transaction-form-selections'>
          <span>Est.Quantity</span>
          <span>{this.state.quantity}</span>
        </div>
      </div>
    </div>
    )
  }

  renderPurchase() {
    const purchaseTotal = (this.state.quantity * this.props.currentPrice).toFixed(2);
    const transactionType = this.state.is_purchase ? 'buy' : 'sell';
    return(
      <aside className='transaction-form-container'>
        <div className='transaction-form'>
          <div className='complete-body complete-title'>
            <div>{this.props.symbol} Order Completed</div>
          </div>
          <div className=''>
            <div className='complete-body'>
              <span>Amount Invested</span>
              <span>{purchaseTotal}</span>
            </div>
            <div className='complete-body'>
              <span>Esimated Shares</span>
              <span>{this.state.quantity}</span>
            </div>
            <div className=' complete-text'>Your order to market {transactionType} {Math.abs(purchaseTotal)} of {this.props.symbol} was completed.</div>
            <button className={`changeColor transaction-button ${this.state.textColor} complete-button`} onClick={this.handleReturnClick}>Done</button>
          </div>
        </div>
      </aside>
    )
  }

  renderAvailable() {
    let available;
    const buyingPower = this.formatDollarString(parseFloat(this.props.user.buyingPower));
    if (this.state.is_purchase) {
      available = `$${buyingPower} buying power available`;
    } else if (this.state.transaction_unit === 'shares') {
      available = `${this.props.quantityOwned.toFixed(6)} Shares Available`;
    } else if (this.state.transaction_unit === 'dollars') {
      available = `${this.state.valueOwned} Available`;
    }

    return <div className={`transaction-form-buy-power changeColor ${this.state.textColor}`}>{available}</div>
  }
  
  render() {
    console.log('render form', this.state)
    if (this.state.isSubmitted) return this.renderPurchase();
    const formEnd = (this.state.transaction_unit === 'shares') ? 
      this.renderSharesForm() : this.renderDollarsForm()
    return (
      <aside className='transaction-form-container'>
        <form className='transaction-form' onSubmit={this.handleSubmit}>
          <div className='transaction-options'>
            <div className={`changeColor purchase-option ${this.state.textColor} active`} id='buy-option' onClick={this.handleClick('buy')}>Buy {this.props.symbol}</div>
            <div className={`changeColor purchase-option ${this.state.textColor}`} id='sell-option' onClick={this.handleClick('sell')}>Sell {this.props.symbol}</div>
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
            <button className={`changeColor transaction-button ${this.state.textColor}`}>Review Order</button>
          </div>
          {this.renderAvailable()}
        </form>
      </aside>
    )
  }
}