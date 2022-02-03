import React, { useEffect, useState } from 'react';

const PortfolioChart = ({transactions, interval, fetchTransactions,user}) => {
  
  if (!transactions.length) return null;
  const [currentTotal, setCurrentTotal] = useState(transactions[transactions.length - 1].currentTotal);
  const [initial, setInitial] = useState(transactions[0].currentTotal);
  const [difference, setDifference] = useState(currentTotal - initial);
  const [percDiff, setPercDiff] = useState(Math.abs((difference / initial) * 100).toFixed(2));
  const [sign, setSign] = useState((difference > 0) ? '+' : '-');


  // let currentTotal = transactions[transactions.length - 1].currentTotal;
  // const initial = transactions[0].currentTotal;

  // const difference = currentTotal - initial;
  // const percDiff = Math.abs((difference / initial) * 100).toFixed(2);
  // let sign = ''
  // if (Math.floor(percDiff) !== 0) symbol = (difference > 0 ? '+' : '-');
  
  const chartData = {
    labels: transactions.map(action => action.createdAt),
    datasets: [
      {
        data: transactions.map(action => action.currentTotal),
        fill: false,
        borderColor: sign === '+' ? 'green' : 'red',
        tension: 0.4,
      }
    ]
  }

  const timeLabel = (tooltipItem) => {
    let time = new Date(tooltipItem.label)
    let hour = time.getHours() + 8;
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
     
    switch (interval) {
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

      if(legendItem[0]) {
        let hoverTotal = transactions[legendItem[0].index].currentTotal;
        const hoverDiff = (hoverTotal) - initial;
        const hoverPercDiff = Math.abs((hoverDiff / initial) * 100).toFixed(2).toLocaleString("en-US");
        let hoverSign = '';
        if (Math.floor(hoverDiff) !== 0) hoverSign = (hoverDiff > 0 ? '+' : '-');
        document.getElementById('currentTotal').innerHTML = `$${parseFloat(hoverTotal.toFixed(2)).toLocaleString("en-US")}`;
        document.getElementById('difference').innerHTML = `${hoverSign}$${Math.abs(hoverDiff).toLocaleString("en-US")} (${hoverSign}${hoverPercDiff.toLocaleString("en-US")}%)`
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
        mode: 'index',
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

    setCurrentTotal(transactions[transactions.length - 1].currentTotal);
    setInitial(transactions[0].currentTotal);
    setDifference(currentTotal - initial);
    setPercDiff(Math.abs((difference / initial) * 100).toFixed(2));
    setSign((difference > 0) ? '+' : '-');
    $('#currentTotal').html(`$${currentTotal.toLocaleString("en-US")}`)
    $('#difference').html(`${sign}${Math.abs(difference).toLocaleString("en-US")} (${sign}${percDiff} %)`)

    $('#myChart').remove();
    $(`#chartDiv`).append("<canvas id='myChart' width={600} height={200}/>");
    const canvas = document.getElementById('myChart');
    if (canvas) {
      const myChart = new Chart(canvas, config)
    }
  })

  const handleClick = (interval) => {
    return (e) => {
      $('.chart-filter').removeClass('active-filter');
      e.currentTarget.classList.add('active-filter')
      fetchTransactions(user.id, interval)
    }
  }

  let colorClass = sign === '+' ? 'greenText' : 'redText';
  return (
      <div className='chart'>
      <div className='totalValue' id ='currentTotal'>
        {`$${currentTotal.toLocaleString("en-US")}`}
        </div>
      <div className='difference'>
        <span id='difference'>
          {sign}${Math.abs(difference).toLocaleString("en-US")} ({sign}{`${percDiff}%`})
        </span>
        <span id='interval'> {interval}</span>
      </div>


        <div id='chartDiv'>
            <canvas id='myChart' width={600} height={200} />
        </div>

        <div className='chartOptions'>
          <span className={`chart-filter ${colorClass}`} onClick={handleClick('Today')}>1D</span>
          <span className={`chart-filter ${colorClass}`} onClick={handleClick('Past Week')}>1W</span>
          <span className={`chart-filter ${colorClass}`} onClick={handleClick('Past Month')}>1M</span>
          <span className={`chart-filter ${colorClass}`} onClick={handleClick('Past 3 Months')}>3M</span>
          <span className={`chart-filter ${colorClass}`} onClick={handleClick('Past Year')}>1Y</span>
        <span className={`chart-filter ${colorClass} active-filter`} onClick={handleClick('All Time')}>ALL</span>
        </div>

      </div>
  )
}

export default PortfolioChart