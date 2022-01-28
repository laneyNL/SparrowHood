import React, { useEffect } from 'react';

const MiniChart = ({ symbol, dailyValues, colorClass }) => {
  if (!symbol) return null;
  
  const labels = Object.keys(dailyValues);
  const data = Object.values(dailyValues).map(value => value["4. close"]);
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        fill: false,
        borderColor: colorClass === 'positive' ? 'green' : 'red',
        tension: 0.2,
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
    elements: {
      point: { radius: 0 }
    }
  }

  useEffect(() => {
    const config = {
      type: 'line',
      data: chartData,
      options: chartOptions,
    };
    $(`#miniChart${symbol}`).remove();

    const newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('id', `miniChart${symbol}`);
    newCanvas.setAttribute('width', `60`);
    newCanvas.setAttribute('height', `20`);

    document.getElementById(`miniChartDiv${symbol}`).append(newCanvas)
    const canvas = document.getElementById(`miniChart${symbol}`);
    if (canvas) {
      const myChart = new Chart(canvas, config)
    }
  })

  return (
    <div className='miniChartDiv' id={`miniChartDiv${symbol}`}>
      <canvas id={`miniChart${symbol}`} width={60} height={20} /> 
    </div>
  )
}


export default MiniChart