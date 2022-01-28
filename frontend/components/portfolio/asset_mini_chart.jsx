import React, { useEffect } from 'react';

const MiniChart = ({ symbol, assets }) => {
  if (!symbol) return null;

  // const chartData = {
  //   labels: transactions.map(action => action.createdAt),
  //   datasets: [
  //     {
  //       data: transactions.map(action => action.currentTotal),
  //       fill: false,
  //       borderColor: symbol === '+' ? 'green' : 'red',
  //       tension: 0.4,
  //     }
  //   ]
  // }

  
  // const chartOptions = {
  //   scales: {
  //     x: {
  //       ticks: { display: false }
  //     },
  //     y: {
  //       ticks: {
  //         display: false,
  //         beginAtZero: false
  //       },
  //     }
  //   },
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     tooltip: {
  //       displayColors: false,
  //       yAlign: top,
  //       mode: 'nearest',
  //       callbacks: {
  //         label: timeLabel,
  //         labelTextColor: () => '#919FA6',
  //         labelColor: () => ({ backgroundColor: 'transparent' }),
  //         title: () => ''
  //       }
  //     }
  //   },
  // }

  // useEffect(() => {
  //   const config = {
  //     type: 'line',
  //     data: chartData,
  //     options: chartOptions,
  //   };

  //   $('#miniChart').remove();
  //   $('#miniChartDiv').append("<canvas id='miniChart' width={60} height={20}/>");
  //   const canvas = document.getElementById('miniChart');
  //   if (canvas) {
  //     const myChart = new Chart(canvas, config)
  //   }
  // })


  // let colorClass = symbol === '+' ? 'greenText' : 'redText';
  return (
    <div id='miniChartDiv'>
      {/* <canvas id='miniChart' width={60} height={20} />  */}
      {symbol}
    </div>
  )
}


export default MiniChart