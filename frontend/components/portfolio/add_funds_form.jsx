import React from 'react';

export default class AddFundsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    let newValue = e.currentTarget.value.split('$').join('');
    newValue = newValue.split(',').join('');
    if (!isNaN(newValue)) {
      this.setState({ amount: `$${newValue.toLocaleString("en-US")}`})
    }
  }

  handleSumbit(e) {
    e.preventDefault();
  }

  clickClose (e){
    e.preventDefault();
  }

  render() {
    return (
      <div className='funds-modal'>
        <div>
        <div className='close-modal'onClick={this.clickClose}>&times;</div>
          <form onSumbit={this.handleSumbit} className='deposit-form'>
            <p>Deposit Funds</p>
            <label>From</label>
              <input type="text" value='A BANK' disabled/>
            <label for='add-amount'> Amount</label>
              <input type="text" value={this.state.amount} placeholder='$0.00' onChange={this.handleChange} id='add-amount'/>
            <button className='review-button'>Confirm</button>
          </form>
        </div>
      </div>
    )
  }
}