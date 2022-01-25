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
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );
  }
  chartData () {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          data: [12, 19, 3, 5, 2],
          fill: false,
          borderColor: 'green'
        }
      ]
    }
  }

  chartOptions() {
    return {
      scales: {
        x: {
          ticks: {
            display: false
          }
        },
        y: {
          ticks: {
            display: false
          }
        }
      }
    }
  }

  render() {
    console.log(this.props.transactions)
    return (
      <div className='chart'>
        <div>
          <Line 
            data= {this.chartData()}
            height={400} 
            width={600}
            options={this.chartOptions()}
          />
        </div>
        <div>
          <span>1D</span>
          <span>1W</span>
          <span>1M</span>
          <span>3M</span>
          <span>1Y</span>
          <span>ALL</span>
        </div>
      </div>
    )
  }
}