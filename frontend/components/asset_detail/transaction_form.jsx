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
      transaction_unit: 'shares',
      isSubmitted: false,
      valueOwned: this.formatDollarString((this.props.currentPrice * this.props.quantityOwned)),
      textColor: this.props.sign === '+' ? 'greenText' : 'redText',
      errors: []
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
      let isPurchase, quantity, dollars;
      if (field === 'buy') {
        isPurchase = true;
        quantity = Math.abs(this.state.quantity);
        dollars = Math.abs(this.state.dollars);
      } else {
        isPurchase = false;
        quantity = -Math.abs(this.state.quantity);
        dollars = -Math.abs(this.state.dollars);
      }

      this.setState({ is_purchase: isPurchase, quantity: quantity, dollars: dollars, errors: []});
    }
  }

  update(field) {
    return (e) => {
      let value = e.currentTarget.value.split('$').join('').split(',').join('');
      if (isNaN(value)) return;

      if (value === '') {
        this.setState({ quantity: 0, dollars: 0 })
        return
      }
      
      let dollars;
      let quantity;
      if (field === 'dollars') {
        dollars = parseFloat(value);
        quantity = dollars/this.props.currentPrice;
      } else {
        quantity = parseFloat(value);
        dollars = quantity * this.props.currentPrice;
      }
      if (!this.state.is_purchase) {
        quantity = -quantity;
        dollars = -dollars;
      }
      this.setState({ quantity: quantity, dollars: dollars, errors: [] });
    }
  }
  handleSelect(e) {
    this.setState({ transaction_unit: e.currentTarget.value, errors: [], quantity: '', dollars: ''})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createTransaction(this.state)
      .then(() => this.setState({ isSubmitted: true }), () => this.setState({ errors: this.props.errors }))
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
        <span><input type="text" placeholder='0' id='transaction-unit-input' onChange={this.update('quantity')} required value={Math.abs(this.state.quantity)}/></span>
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
          <span><input type="text" placeholder='$0.00' id='transaction-unit-input' onChange={this.update('dollars')} required value={`$${Math.abs(this.state.dollars).toLocaleString("en-US")}`}/></span>
      </div>

      <div className='transaction-confirmation'>
        <div className='transaction-form-selections'>
          <span>Est.Quantity</span>
          <span>{Math.abs(this.state.quantity)}</span>
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
            <div className=' complete-text'>Your order to market {transactionType} ${Math.abs(purchaseTotal)} of {this.props.symbol} was completed.</div>
            <div className='transaction-button-div'>
            <button className={`changeColor transaction-button ${this.state.textColor} complete-button`} onClick={this.handleReturnClick}>Done</button>
            </div>
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
    if (this.state.isSubmitted) return this.renderPurchase();
    const formEnd = (this.state.transaction_unit === 'shares') ? 
      this.renderSharesForm() : this.renderDollarsForm()
    let errors = '';
    if (this.state.errors[0]) {
      errors = <div className='transaction-errors'><i className="fas fa-exclamation-circle"></i> {`${this.state.errors[0]}`} </div>
    }
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
            { errors }
            <div className='transaction-button-div'>
              <button className={`changeColor transaction-button ${this.state.textColor}`}>Review Order</button>
            </div>
          </div>
          {this.renderAvailable()}
        </form>
      </aside>
    )
  }
}