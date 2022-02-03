import React from 'react';
import { Link } from 'react-router-dom';


export default class PortfolioHeader extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      keyword: '',
      results: '',
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    const keyword = e.currentTarget.value;
    if (!keyword) {
      this.setState({ keyword: '', results: '' });
    } else {
      Promise.all([this.props.fetchSearch(keyword)])
        .then(() => {
          this.setState({ keyword: keyword, results: this.props.results })
        })
    }
  }

  renderSearchResults() {
    if (!this.state.results && !this.state.keyword) return '';
    if (!this.state.results[this.state.keyword].length) return (
      <div className='search-results-div'>
        <div className='no-results'>We were unable to find any results for your search.</div>
      </div>
    )
    const searchRow = this.state.results[this.state.keyword].map((result, idx) => {
      return (
        <Link to={`/assets/${result["1. symbol"]}`} key={idx} className='search-result'>
          <div className='search-result-symbol'>{result["1. symbol"]}</div>
          <div>{result["2. name"]}</div>
        </Link>
      )
    })
    return (
      <div className='search-results-div'>
        {searchRow}
      </div>
    )
  }

  render() {

    console.log('render', this.state)
    return (
      <nav className='port-nav'>
        <Link to='/'><img src={'https://sparrowhood-dev.s3.us-west-1.amazonaws.com/images/green-feather.png'} alt="green feather" id='feather' /></Link>

        <div className='search-bar-div'>
          <div><i className="fas fa-search"></i></div>
          <input type="text" placeholder='Search' value={this.state.keyword} onChange={this.handleSearch} id='search-bar' autoComplete="off"/>
          
          {this.renderSearchResults()}
          
        </div>


        <Link to='/' className='white'>Portfolio</Link>
        <button onClick={this.props.logout}>Logout</button>
        <Link to='/'>Cash</Link>
      </nav>
    )
  }
    
}