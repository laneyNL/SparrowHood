import React, { useEffect, useState } from 'react';

const PortfolioChart = (props) => {
  if (!props.transactions.length) return null;

  let currentTotal = props.transactions[props.transactions.length - 1].currentTotal;
  const initial = props.transactions[0].currentTotal;
  let interval = 'Today';

  const difference = (currentTotal) - initial;
  const percDiff = Math.abs((difference / initial) * 100).toFixed(2);
  let symbol = ''
  if (Math.floor(percDiff) !== 0) symbol = (difference > 0 ? '+' : '-');
  

  const chartData = {
    labels: props.transactions.map(action => action.createdAt),
    datasets: [
      {
        data: props.transactions.map(action => action.currentTotal),
        fill: false,
        borderColor: symbol === '+' ? 'green' : 'red',
        tension: 0.4,
      }
    ]
  }

  const date = (tooltipItem) => {
    let time = new Date(tooltipItem.label)
    return time.toDateString().split(' ').slice(1).join(' ');
  }

  const chartOptions = {
    scales: {
      x: {
        ticks: { display: false }
      },
      y: {
        ticks: {
          display: false,
          beginAtZero: false
        },
      }
    },
    onHover: (e, legendItem, legend) => {
      if(legendItem[0]) {
        currentTotal = props.transactions[legendItem[0].index].currentTotal;
        const difference = (currentTotal) - initial;
        const percDiff = Math.abs((difference / initial) * 100).toFixed(2).toLocaleString("en-US");
        let symbol = '';
        if (Math.floor(difference) !== 0) symbol = (difference > 0 ? '+' : '-');
        document.getElementById('currentTotal').innerHTML = `$${currentTotal.toFixed(2).toLocaleString("en-US")}`;
        document.getElementById('difference').innerHTML = `${symbol}$${Math.abs(difference).toLocaleString("en-US")} (${symbol}${percDiff}%)`
      }
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
          labelTextColor: () => 'white',
          labelColor: () => ({ backgroundColor: 'transparent' }),
          title: () => ''
        }
      }
    },
  }

  useEffect(() => {
    const tooltipLine = {
      id: 'tooltipLine',
      beforeDraw: chart => {
        if (chart.tooltip._active && chart.tooltip._active.length) {
          // console.log(chart)
          const ctx = chart.ctx;
          ctx.save();
          const activePoint = chart.tooltip._active[0];
          // console.log(activePoint)
          ctx.beginPath();
          ctx.moveTo(activePoint.element.x, 0);
          ctx.lineTo(activePoint.element.x, chart.chartArea.height);
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#919FA6';
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    const config = {
      type: 'line',
      data: chartData,
      options: chartOptions,
      plugins: [tooltipLine]
    };

    $('#myChart').remove();
    $('#chartDiv').append("<canvas id='myChart' width={600} height={200}/>");
    const canvas = document.getElementById('myChart');
    if (canvas) {
      const myChart = new Chart(canvas, config)
    }
    })

    
  

  return (
      <div className='chart'>
      <div className='totalValue' id ='currentTotal'>{`$${currentTotal.toFixed(2).toLocaleString("en-US")}`}</div>
      <div className='difference'>
        <span id='difference'>{symbol}${Math.abs(difference).toLocaleString("en-US")} ({symbol}{`${percDiff}%`})</span>
        <span id='interval'> {interval}</span>
      </div>


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

export default PortfolioChart