import React from 'react';

export default class AssetChart extends React.Component {
  constructor(props) {
    super(props);
  }

  chartData() {
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
    const date = (tooltipItem) => {
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
          
        },
        tooltip: {
          displayColors: false,
          callbacks: {
            label: date,
            labelTextColor: () => 'green',
            labelColor: () => ({ backgroundColor: 'transparent' }),
            title: () => ''
          }
        }
      },
      hover: (e, legendItem, legend) => {
        this.setState({ difference: 10 })
        console.log('hover', e, legendItem, legend)
      }
    }
  }

  componentDidUpdate() {
    const config = {
      type: 'line',
      data: this.chartData(),
      options: this.chartOptions()
    };

    $('#assetChart').remove();
    $('#assetChartDiv').append("<canvas id='assetChar' width={600} height={200}/>");
    const canvas = document.getElementById('assetChart');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const myChart = new Chart(ctx, config)
    }
  }

  updateSummary(event, legendItem, legend) {
    console.log('hover', event, legendItem, legend)
  }

  render() {

    return (
      <div className='assetChartDiv'>
        <canvas id='assetChart' width={600} height={200} />
      </div>
    )
  }
}