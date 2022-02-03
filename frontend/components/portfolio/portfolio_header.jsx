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
    this.listener = (e) => {
      const searchBar = document.getElementById('search-bar');
      const results = document.querySelector('.search-results-div')
      if (searchBar.contains(e.target)) {
        $('.search-results-div').removeClass('hidden');
      } else {
        $('.search-results-div').addClass('hidden');
      }
    }
    document.addEventListener('mouseup', this.listener);

  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.listener);
  }

  handleSearch(e) {
    const keyword = e.currentTarget.value;
    if (!keyword) {
      this.setState({ keyword: '', results: '' });
    } else {
      this.setState({ keyword: keyword }, () => {
        Promise.all([this.props.fetchSearch(keyword)])
          .then(() => {
            this.setState({ results: this.props.results || []})
          })
      })
    }
  }

  renderSearchResults() {
    if (!this.state.results && !this.state.keyword) return '';
    if (!this.state.results[this.state.keyword] || !this.state.results[this.state.keyword].length) return (
        <div className='no-results'>We were unable to find any results for your search.</div>
    )
    const searchRow = this.state.results[this.state.keyword].map((result, idx) => {
      const symbol = result["1. symbol"];
      if (symbol.includes('.')) return '';
      return (
        <Link to={`/assets/${symbol}`} key={idx} className='search-result'>
          <div className='search-result-symbol'>{symbol}</div>
          <div>{result["2. name"]}</div>
        </Link>
      )
    })
    return searchRow;
  }

  render() {
    return (
      <nav className='port-nav'>
        <Link to='/'><img src={'https://sparrowhood-dev.s3.us-west-1.amazonaws.com/images/green-feather.png'} alt="green feather" id='feather' /></Link>

        <div className='search-bar-div'>
          <div className='search-bar-flex'>
            <div><i className="fas fa-search"></i></div>
            <input type="text" placeholder='Search' value={this.state.keyword} onChange={this.handleSearch} id='search-bar' autoComplete="off"/>
          </div>
          <div className='search-results-div hidden'>
          { this.renderSearchResults()}
          </div>
          
        </div>


        <Link to='/' className='white'>Portfolio</Link>
        <button onClick={this.props.logout}>Logout</button>
        <Link to='/'>Cash</Link>
      </nav>
    )
  }
    
}