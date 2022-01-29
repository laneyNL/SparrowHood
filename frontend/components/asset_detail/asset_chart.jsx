import React, { useEffect, useState } from 'react';

const AssetChart = ({ fetchAssetFull, fetchCryptoFull, fetchAssetInterval, fetchCryptoInterval, name, assets, symbol }) => {
  console.log('symbol', symbol)
  if (!asset) return null;
  const [days, setDays] = useState(1);
  // const assetObject = asset[symbol];
  const assetObject = asset['AMC'];

  let period = days === 1 ? 'interval' : 'full';

  const assetKeys = Object.keys(assetObject);
  const values = Object.values(assetObject);
  let labels = assetKeys;
  let data = values.map(value => value["4. close"]);

  if (days > 1) {
    let start = assetKeys.length - 1 - days;
  
    labels = assetKeys.slice(start, assetKeys.length);
    data = values.slice(start, assetKeys.length);
  }
  
  let currentValue = data[data.length - 1];
  const initial = data[0];

  const difference = currentValue - initial;
  const percDiff = Math.abs((difference / initial) * 100).toFixed(2);
  let symbol = ''
  if (Math.floor(percDiff) !== 0) symbol = (difference > 0 ? '+' : '-');

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        fill: false,
        borderColor: symbol === '+' ? 'green' : 'red',
        tension: 0.4,
      }
    ]
  }

  const timeLabel = (tooltipItem) => {
    // let time = new Date(tooltipItem.label)
    // let hour = time.getHours();
    // let minutes = time.getMinutes();
    // if (minutes < 10) minutes = ` ${minutes}`;
    // let dayTime = 'AM';
    // if (hour > 12) {
    //   dayTime = 'PM';
    //   hour -= 12;
    // }
    // const timeString = `${hour}:${minutes} ${dayTime}`
    // const dateString = time.toDateString().toUpperCase().split(' ').slice(1).join(' ');
    // const dateStringSplit = dateString.split(' ')

    // switch (interval) {
    //   case ('Today'):
    //     return timeString;
    //   case ('Past Week'):
    //     return `${dateStringSplit[0]} ${dateStringSplit[1]}, ${timeString}`
    //   case ('Past Month'):
    //     return `${dateStringSplit[0]} ${dateStringSplit[1]}, ${timeString}`
    //   default:
    //     return `${dateStringSplit[0]} ${dateStringSplit[1]}, ${dateStringSplit[2]}`
    // }
    return tooltipItem.label
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
        let symbol = '';
        if (Math.floor(difference) !== 0) symbol = (difference > 0 ? '+' : '-');
        document.getElementById('currentValue').innerHTML = `$${currentValue.toFixed(2).toLocaleString("en-US")}`;
        document.getElementById('difference-value').innerHTML = `${symbol}$${Math.abs(difference).toLocaleString("en-US")} (${symbol}${percDiff.toLocaleString("en-US")}%)`
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
  })

  const handleClick = (interval) => {
    return (e) => {
      $('.chart-filter').removeClass('active-filter');
      e.currentTarget.classList.add('active-filter');
      switch (interval) {
        case 'Today':
          setDays(1);
        case 'Past Week':
          setDays(7);
        case 'Past Month':
          setDays(30);
        case 'Past 3 Months':
          setDays(90);
        case 'Past Year':
          setDays(365);
        case 'Past 5 Years':
          setDays(365);
      }
      start = assetKeys.length - days;
      labels = assetKeys.slice(start, assetKeys.length);
      data = values.slice(start, assetKeys.length).map(value => value["4. close"]);
      
      // fetchassetValues(user.id, interval)
    }
  }
  let colorClass = symbol === '+' ? 'greenText' : 'redText';
  console.log(currentValue, 'diff', difference)
  return (
    <div className='chart'>
      <div>{name}</div>
      <div className='totalValue' id='currentValue'>
        {`$${currentValue.toLocaleString("en-US")}`}
      </div>
      <div className='difference'>
        <span id='difference-value'>
          {symbol}${Math.abs(difference).toLocaleString("en-US")} ({symbol}{`${percDiff}%`})
        </span>
        <span id='interval'> {days}</span>
      </div>


      <div id='assetChartDiv'>
        <canvas id='assetChart' width={600} height={200} />
      </div>

      <div className='chartOptions'>
        <span className={`chart-filter ${colorClass}`} onClick={handleClick('Today')}>1D</span>
        <span className={`chart-filter ${colorClass}`} onClick={handleClick('Past Week')}>1W</span>
        <span className={`chart-filter ${colorClass}`} onClick={handleClick('Past Month')}>1M</span>
        <span className={`chart-filter ${colorClass}`} onClick={handleClick('Past 3 Months')}>3M</span>
        <span className={`chart-filter ${colorClass}`} onClick={handleClick('Past Year')}>1Y</span>
        <span className={`chart-filter ${colorClass}`} onClick={handleClick('Past 5 Years')}>5Y</span>
      </div>

    </div>
  )
}

export default AssetChart