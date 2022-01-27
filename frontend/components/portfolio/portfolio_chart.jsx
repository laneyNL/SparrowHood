import React from 'react';
import { $CombinedState } from 'redux';

export default class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);

      
    this.state = {
      difference: 0,
      transactions: [],
      chart: ''
    }
    // this.updateSummary = this.updateSummary.bind(this);
  }

  chartData () {
    return {
      labels: this.props.transactions.map(action => action.createdAt),
      datasets: [
        {
          data: this.props.transactions.map(action => action.currentTotal),
          fill: false,
          borderColor: 'green'
        }
      ]
    }
  }

  chartOptions() {
    const change = (tooltipItem) => {
      let time = new Date(tooltipItem.label)
      return time.toDateString().split(' ').slice(1).join(' ');
    }
 
    return {
      scales: {
        x: {
          ticks: { display: false }
        },
        y: {
          ticks: { display: false }
        }
      },
      plugins: {
        legend: { 
          display: false,
          // onHover: (e, legendItem, legend) => {
          //   this.setState({ difference: 10 })
          //   console.log('hover', e, legendItem, legend) }
         },
        tooltip: {
          displayColors: false,
          callbacks: {
            label: change,
            labelTextColor: () => 'green',
            labelColor: () => ({
              backgroundColor: 'transparent'
            }),
            title: () => ''
          }
        }
      }
    }
  }

  updateSummary(event, legendItem, legend) {
    console.log('hover', event, legendItem, legend)
    console.log(...arguments)
    // const change = (tooltipItems) => {
    //   console.log('toolitems', tooltipItems)
    //   let initialTotal = this.props.transactions[0].currentTotal;
    //   let currTotal = tooltipItems[0].currentTotal;
    //   let diff = currTotal - initialTotal;
    //   let percent_diff = (diff / initialTotal) * 100;
    //   const symbol = diff > 0 ? '+' : '-';
    //   return `${symbol}${diff}(${symbol}${percent_diff}%)`;
    // }
  }
 
  onClick() {

  }

  componentDidUpdate() {
    const labels = [
      'January','February','March','April','May', 'June',];

    const data = {
      labels: labels,
      datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      }]
    };

    const config = {
      type: 'line',
      data: data,
      options: {}
    };

    $('#myChart').remove();
    $('#chartDiv').append("<canvas id='myChart' width={600} height={200}/>");
    const canvas = document.getElementById('myChart');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const myChart = new Chart(ctx, config)
    }
  }

  render() {
    if (!this.props.transactions.length) return null;
    const totalValue = `$${this.props.transactions[this.props.transactions.length - 1].currentTotal.toFixed(2)}`;
    const difference = '';
    return (
        
      <div className='chart'>
        <div id='chartDiv'>
          <canvas id='myChart' width={600} height={200}/>
        </div>

        <div className='totalValue'>{totalValue}</div>
        <div className='difference'>{difference}</div>
        <div></div>
        <div className = 'graph'>
          {/* <Line 
            data= {this.chartData()}
            height={200} 
            width={600}
            options={this.chartOptions()}
          /> */}
        </div>
        <div className='chartOptions'>
          <span className='nav-link'>1D</span>
          <span className='nav-link'>1W</span>
          <span className='nav-link'>1M</span>
          <span className='nav-link'>3M</span>
          <span className='nav-link'>1Y</span>
          <span className='nav-link'>ALL</span>
        </div>
        
      </div>
    )
  }
}