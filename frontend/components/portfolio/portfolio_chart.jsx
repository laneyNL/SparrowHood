import React from 'react';
// import Chart from 'chart.js/auto';

export default class PortfolioChart extends React.Component {

  chart () {
    let chartDiv = document.getElementById('chart').getContext('2d');
    let chart = new Chart(chartDiv, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'cost',
          data: [100, 400, 200, 2100],
          backgroundColor: 'green'
        }]
      },
      options: {}
    })
  }

  render() {
    return (
      <div>
        <canvas id="chart" width="600" height="400"></canvas>
        {/* {this.props.transactions.map(tran => <div>${tran}</div>)} */}
      </div>
    )
  }
}