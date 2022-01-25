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
          label: 'cost',
          data: [12, 19, 3, 5, 2],
          fill: false,
          borderColor: 'rgb(75, 192, 192)'
        }
      ]
    }
  }

  chartOptions() {
    return {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }

  render() {
    console.log(this.props.transactions)
    return (
      <div className='chart'>
        <Line 
          data= {this.chartData()}
          height={400} 
          width={600}
          options={this.chartOptions()}
        />
      </div>
    )
  }
}