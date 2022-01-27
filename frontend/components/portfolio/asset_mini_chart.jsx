import React from 'react';

export default class AssetMiniChart extends React.Component {
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
          borderColor: 'green',
          tension: 0.4,
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
          onHover: (e, legendItem, legend) => {
            this.setState({ difference: 10 })
            console.log('hover', e, legendItem, legend)
          }
        },
        tooltip: {
          displayColors: false,
          yAlign: top,
          callbacks: {
            label: date,
            labelTextColor: () => 'green',
            labelColor: () => ({ backgroundColor: 'transparent' }),
            title: () => ''
          }
        }
      },
    }
  }

  componentDidUpdate() {
    const config = {
      type: 'line',
      data: this.chartData(),
      options: this.chartOptions(),
    };

    $('#miniChart').remove();
    $('#miniChartDiv').append("<canvas id='miniChart' width={600} height={200}/>");
    const canvas = document.getElementById('myChart');
    if (canvas) {
      const myChart = new Chart(canvas, config)
    }
  }


  render() {
    return (
      <div className='miniChartDiv'>
        <canvas id='miniChart' width={60} height={20} />
      </div>
    )
  }
}