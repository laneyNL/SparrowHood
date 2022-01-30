import React, { useEffect, useState } from 'react';

const AssetChart = ({ name, assets, symbol }) => {
  
  if (jQuery.isEmptyObject(assets) || !assets['interval'] || !assets['full']) return null;
  
  const [days, setDays] = useState(1);
  const [chartInterval, setChartInterval] = useState('Today');
  const period = (days === 1) ? 'interval' : 'full';
  const assetObject = assets[period][symbol];

  const assetKeys = Object.keys(assetObject);
  const values = Object.values(assetObject);
  let labels = assetKeys;
  let data = values.map(value => value["4. close"]);

  if (days > 1) {
    let start = assetKeys.length - 1 - days;
    labels = assetKeys.slice(start, assetKeys.length);
    data = data.slice(start, assetKeys.length);
  }
  
  let currentValue = data[data.length - 1];
  const initial = data[0];

  const difference = currentValue - initial;
  const percDiff = Math.abs((difference / initial) * 100).toFixed(2);
  let sign = ''
  if (Math.floor(percDiff) !== 0) sign = (difference > 0 ? '+' : '-');

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        fill: false,
        borderColor: sign === '+' ? 'green' : 'red',
        tension: 0.4,
      }
    ]
  }

  const timeLabel = (tooltipItem) => {
    let time = new Date(tooltipItem.label)
    let hour = time.getHours();
    let minutes = time.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;
    let dayTime = 'AM';
    if (hour > 12) {
      dayTime = 'PM';
      hour -= 12;
    }
    const timeString = `${hour}:${minutes} ${dayTime}`
    const dateString = time.toDateString().toUpperCase().split(' ').slice(1).join(' ');
    const dateStringSplit = dateString.split(' ')

    switch (chartInterval) {
      case ('Today'):
        return timeString;
      case ('Past Week'):
        return `${dateStringSplit[0]} ${dateStringSplit[1]}, ${timeString}`
      case ('Past Month'):
        return `${dateStringSplit[0]} ${dateStringSplit[1]}, ${timeString}`
      default:
        return `${dateStringSplit[0]} ${dateStringSplit[1]}, ${dateStringSplit[2]}`
    }
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
      if (legendItem[0]) {
        currentValue = parseFloat(data[legendItem[0].index]);
        const difference = (currentValue) - initial;
        const percDiff = Math.abs((difference / initial) * 100).toFixed(2).toLocaleString("en-US");
        let sign = '';
        if (Math.floor(difference) !== 0) sign = (difference > 0 ? '+' : '-');
        document.getElementById('currentValue').innerHTML = `$${currentValue.toFixed(2).toLocaleString("en-US")}`;
        document.getElementById('difference-value').innerHTML = `${sign}$${Math.abs(difference).toLocaleString("en-US")} (${sign}${percDiff.toLocaleString("en-US")}%)`
      }
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        yAlign: top,
        mode: 'nearest',
        intersect: false,
        callbacks: {
          label: timeLabel,
          labelTextColor: () => '#919FA6',
          labelColor: () => ({ backgroundColor: 'transparent' }),
          title: () => ''
        }
      }
    },
    elements: {
      point: { radius: 0 }
    },
  }

  useEffect(() => {
    const tooltipLine = {
      id: 'tooltipLine',
      beforeDraw: chart => {
        if (chart.tooltip && chart.tooltip._active && chart.tooltip._active.length) {
          const ctx = chart.ctx;
          ctx.save();
          const activePoint = chart.tooltip._active[0];
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
      data: chartData,
      options: chartOptions,
      plugins: [tooltipLine]
    };

    $('#assetChart').remove();
    $(`#assetChartDiv`).append("<canvas id='assetChart' width={600} height={200}/>");
    const canvas = document.getElementById('assetChart');
    if (canvas) {
      const myChart = new Chart(canvas, config)
    }
    
    
   
    const activeIntervalId = `#${chartInterval.split(' ').join('-')}`;
    $(activeIntervalId).addClass('active-filter');
  })

  const handleClick = (interval) => {
    return (e) => {
      e.preventDefault();
      $('.chart-filter').removeClass('active-filter');
      e.currentTarget.classList.add('active-filter');
      setChartInterval(interval);
      switch (interval) {
        case 'Today':
          setDays(1);
          break;
        case 'Past Week':
          setDays(7);
          break;
        case 'Past Month':
          setDays(30);
          break;
        case 'Past 3 Months':
          setDays(90);
          break;
        case 'Past Year':
          setDays(365);
          break;
        case 'Past 5 Years':
          setDays(1825);
          break;
      }

    }
  }
  let colorClass = sign === '+' ? 'greenText' : 'redText';
  // changes color for transaction form
  $('.changeColor').removeClass('greenText');
  $('.changeColor').removeClass('redText');
  $('.changeColor').addClass(colorClass);

  return (
    <div className='chart'>
      <div className='chart-name'>{name}</div>
      <div className='totalValue chart-name' id='currentValue'>
        {`$${currentValue.toLocaleString("en-US")}`}
      </div>
      <div className='difference'>
        <span id='difference-value'>
          {sign}${Math.abs(difference).toLocaleString("en-US")} ({sign}{`${percDiff}%`})
        </span>
        <span id='interval'> {chartInterval}</span>
      </div>

      <div id='assetChartDiv'>
        <canvas id='assetChart' width={600} height={200} />
      </div>

      <div className='chartOptions'>
        <span className={`chart-filter ${colorClass}`} onClick={handleClick('Today')} id='Today'>1D</span>
        <span className={`chart-filter ${colorClass}`} onClick={handleClick('Past Week')} id='Past-Week'>1W</span>
        <span className={`chart-filter ${colorClass}`} onClick={handleClick('Past Month')} id='Past-Month'>1M</span>
        <span className={`chart-filter ${colorClass}`} onClick={handleClick('Past 3 Months')} id='Past-3-Months'>3M</span>
        <span className={`chart-filter ${colorClass}`} onClick={handleClick('Past Year')} id='Past-Year'>1Y</span>
        <span className={`chart-filter ${colorClass}`} onClick={handleClick('Past 5 Years')} id='Past-5-Years'>5Y</span>
      </div>

    </div>
  )
}

export default AssetChart