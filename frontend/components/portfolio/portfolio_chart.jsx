import React, { useEffect, useState } from 'react';
import { formatDollarString } from '../../util/format_util';

const PortfolioChart = ({transactions, interval, fetchTransactions,user}) => {
  
  if (!transactions.length) return <div className='no-transactions'>Search for and purchase a stock to display a chart of your transactions.</div>;
  // transactions = transactions.reverse();

  const [currentTotal, setCurrentTotal] = useState(transactions[transactions.length - 1].currentTotal);
  const [initial, setInitial] = useState(transactions[0].currentTotal);
  const [difference, setDifference] = useState(currentTotal - initial);
  const [percDiff, setPercDiff] = useState(Math.abs((difference / initial) * 100).toFixed(2));
  const [sign, setSign] = useState((difference > 0) ? '+' : '-');
  const [target, setTarget] = useState('');

  useEffect(() => {
    $('.chart-filter').removeClass('active-filter');
    if (target) {
      target.classList.add('active-filter');
    } else {
      setTarget(document.getElementById('ALL'))
    }

    setCurrentTotal(transactions[transactions.length - 1].currentTotal);
    setInitial(transactions[0].currentTotal);
    setDifference(currentTotal - initial);
    setPercDiff(Math.abs((difference / initial) * 100).toFixed(2));
    setSign((difference > 0) ? '+' : '-');
    $('#currentTotal').html(formatDollarString(currentTotal))
    $('#difference').html(`${sign}${formatDollarString(Math.abs(difference))} (${sign}${percDiff} %)`)

    const config = {
      type: 'line',
      data: chartData,
      options: chartOptions,
      plugins: [tooltipLine]
    };

    $('#myChart').remove();
    $(`#chartDiv`).append("<canvas id='myChart' width={600} height={200}/>");
    const canvas = document.getElementById('myChart');
    if (canvas) {
      const myChart = new Chart(canvas, config)
    }
  })

  const handleClick = (interval) => {
    return (e) => {
      fetchTransactions(user.id, interval)
      setTarget(e.currentTarget);
    }
  }

  let colorClass = sign === '+' ? 'greenText' : 'redText';

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
          // beginAtZero: false
        },
      }
    },
    onHover: (e, legendItem, legend) => {

      if (legendItem[0]) {
        let hoverTotal = transactions[legendItem[0].index].currentTotal;
        const hoverDiff = (hoverTotal) - initial;
        const hoverPercDiff = formatDollarString(Math.abs((hoverDiff / initial) * 100));
        let hoverSign = '';
        if (Math.floor(hoverDiff) !== 0) hoverSign = (hoverDiff > 0 ? '+' : '');
        document.getElementById('currentTotal').innerHTML = `${formatDollarString(hoverTotal)}`;
        document.getElementById('difference').innerHTML = `${hoverSign}${formatDollarString(hoverDiff)} (${hoverSign}${hoverPercDiff.toLocaleString("en-US")}%)`
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

  return (
      <div className='chart'>
      <div className='totalValue' id ='currentTotal'>
        {`${formatDollarString(currentTotal)}`}
        </div>
      <div className='difference'>
        <span id='difference'>
          {sign}{formatDollarString(Math.abs(difference))} ({sign}{`${percDiff}%`})
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
        <span className={`chart-filter ${colorClass}`} onClick={handleClick('All Time')} id='ALL'>ALL</span>
        </div>

      </div>
  )
}

export default PortfolioChart