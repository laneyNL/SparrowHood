import React, { useEffect } from 'react';

const MiniChart = ({ symbol, dailyValues }) => {
  if (!symbol) return null;

  const labels = Object.keys(dailyValues);
  const data = Object.values(dailyValues).map(value => value["4. close"]);
  const is_gain = (data[data.length - 1] - data[0]) > 0;
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        fill: false,
        borderColor: is_gain? 'green' : 'red',
        tension: 0.4,
      }
    ]
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
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          title: () => ''
        }
      }
    },
  }

  useEffect(() => {
    const config = {
      type: 'line',
      data: chartData,
      options: chartOptions,
    };

    $(`#miniChart${symbol}`).remove();
    $(`miniChartDiv${symbol}`).append("<canvas id={`miniChart${symbol}`} width={60} height={20} /> ");
    const canvas = document.getElementById(`miniChart${symbol}`);
    if (canvas) {
      const myChart = new Chart(canvas, config)
    }
  })

  return (
    <div id={`miniChartDiv${symbol}`}>
      <canvas id={`miniChart${symbol}`} width={60} height={20} /> 
    </div>
  )
}


export default MiniChart