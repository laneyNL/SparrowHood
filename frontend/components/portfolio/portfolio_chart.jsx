import React from 'react';
import * as d3 from 'd3';

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
      onHover: (e, legendItem, legend) => {
        // this.setState({ difference: 10 })
        console.log('event', e)
        console.log('legendItem', legendItem)
        console.log('legend', legend)
      },
      plugins: {
        legend: { 
          display: false,
         },
        tooltip: {
          displayColors: false,
          yAlign: top,
          mode: 'nearest',
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
    const tooltipLine = {
      id: 'tooltipLine',
      beforeDraw: chart => {
        if (chart.tooltip._active && chart.tooltip._active.length) {
          const ctx = chart.ctx;
          ctx.save();
          const activePoint = chart.tooltip._active[0];
          // console.log(activePoint)
          ctx.beginPath();
          ctx.moveTo(activePoint.element.x, 0);
          ctx.lineTo(activePoint.element.x, chart.chartArea.height);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'white';
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    const config = {
      type: 'line',
      data: this.chartData(),
      options: this.chartOptions(),
      plugins: [tooltipLine]
    };

    $('#myChart').remove();
    $('#chartDiv').append("<canvas id='myChart' width={600} height={200}/>");
    const canvas = document.getElementById('myChart');
    if (canvas) {
      // const ctx = canvas.getContext('2d');
      const myChart = new Chart(canvas, config)
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



  render() {
    if (!this.props.transactions.length) return null;
    const totalValue = `$${this.props.transactions[this.props.transactions.length - 1].currentTotal.toFixed(2)}`;
    const difference = '';
    return (
        
      <div className='chart'>
        

        <div className='totalValue'>{totalValue}</div>
        <div className='difference'>{difference}</div>
        <div id='chartDiv'>
            <canvas id='myChart' width={600} height={200} />
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