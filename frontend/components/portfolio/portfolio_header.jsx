import React from 'react';
import { Link } from 'react-router-dom';
import {fetchSearch} from '../../actions/search_actions'

export default class PortfolioHeader extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      keyword: '',
      results: ''
    }
  }

  handleSearch(e) {
    const keyword = e.currentTarget.value;
    // this.props.fetchSearch(keyword)
    //   .then(() => {
    //     this.setState({ keyword: keyword})
    //   })
    fetchSearch(keyword)
      .then(() => {
        this.setState({ keyword: keyword})
      })
  }

  render() {
    return (
      <nav className='port-nav'>
        <Link to='/'><img src={'https://sparrowhood-dev.s3.us-west-1.amazonaws.com/images/green-feather.png'} alt="green feather" id='feather' /></Link>
        <div><input type="text" placeholder='Search' value={this.state.keyword} onChange={this.handleSearch}/></div>
        <Link to='/' className='white'>Portfolio</Link>
        <button onClick={this.props.logout}>Logout</button>
        <Link to='/'>Cash</Link>
      </nav>
    )
  }
    
}