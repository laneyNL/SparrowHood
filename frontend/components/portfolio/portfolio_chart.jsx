import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

export default class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalValue: '',
      difference: ''
    }
    this.updateSummary.bind(this)
  }

  componentDidMount() {
    ChartJS.register(
      CategoryScale, LinearScale, PointElement, LineElement, Title,
      Tooltip, Legend);
    this.props.fetchTransactions(this.props.user.id)
      .then(() => this.setState({ 
        totalValue: this.props.transactions[this.props.transactions.length - 1].currentTotal 
      }));
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
          onHover: this.updateSummary,
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

  updateSummary(e) {
    console.log(e)
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

  render() {
    return (
      <div className='chart'>
        <div>{this.state.totalValue}</div>
        <div>{this.state.difference}</div>
        <div></div>
        <div className = 'graph'>
          <Line 
            data= {this.chartData()}
            height={200} 
            width={600}
            options={this.chartOptions()}
          />
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