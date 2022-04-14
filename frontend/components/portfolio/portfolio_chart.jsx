import React, { useEffect, useState } from 'react';
import { formatDollarString } from '../../util/format_util';

const PortfolioChart = ({transactions, interval, fetchTransactions,user, color, updateColor}) => {
  if (!transactions.length) transactions.push({'currentTotal': 0})

  const [currentTotal, setCurrentTotal] = useState(transactions[transactions.length - 1].currentTotal);
  const [initial, setInitial] = useState(transactions[0].currentTotal);
  const chartOptions = getChartOptions(transactions, initial);

  useEffect(() => {
    console.log('useEffect')
    setCurrentTotal(transactions[transactions.length - 1].currentTotal);
    setInitial(transactions[0].currentTotal);
    updateColor(difference > 0 ? 'green' : 'red');
    if (document.getElementById('currentTotal').innerHTML === '') {
      setHeadings(currentTotal, sign, difference, percDiff);
    }

    const config = {
      type: 'line',
      data: chartData,
      options: chartOptions,
      plugins: [tooltipLine]
    };

    $('#myChart').remove();
    $(`#chartDiv`).append("<canvas id='myChart' width={600} height={200}/>");
    const canvas = document.getElementById('myChart');

    const myChart = new Chart(canvas, config);

  }, [interval, color])

  const handleClick = (newInterval) => {
    return (e) => {
      if (newInterval !== interval) {
        $('.chart-filter').removeClass('active-filter');
        e.currentTarget.classList.add('active-filter');
        fetchTransactions(user.id, newInterval);
      }
    }
  }

  let difference = currentTotal - initial;
  let percDiff = Math.abs((difference / initial) * 100).toFixed(2);
  let sign = (difference >= 0) ? '+' : '-';
  

  let colorClass = color === 'green' ? 'greenText' : 'redText';
  const chartData = getChartData(transactions, color);

  setHeadings(currentTotal, sign, difference, percDiff);

  return (
    <div className='chart'>
        <div className='totalValue' id='currentTotal'></div>

        <div className='difference'>
          <span id='difference'></span>
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

const setHeadings = (total, sign, diff, percDiff) => {
  console.log(total, sign)
  let heading = `${formatDollarString(total)}`;
  let subheading = `${sign}${formatDollarString(Math.abs(diff))} (${sign}${percDiff.toLocaleString("en-US")}%)`;

  if (total === 0) {
    heading = 'Insufficent transactions in interval.';
    subheading = 'Please add more transactions';
  }

  let currTotalDiv = document.getElementById('currentTotal')
  let diffDiv = document.getElementById('difference')
  if (!currTotalDiv || !diffDiv) return;
  currTotalDiv.innerHTML = heading;
  diffDiv.innerHTML = subheading;
}

const getChartData = (transactions, color) => {
  return ({
    labels: transactions.map(action => action.createdAt),
    datasets: [
      {
        data: transactions.map(action => action.currentTotal),
        fill: false,
        borderColor: color,
        tension: 0.4,
      }
    ]
  })
}

const getChartOptions = (transactions, initial) => {
  return (
    {
      scales: {
        x: {
          ticks: { display: false }
        },
        y: {
          ticks: { display: false,},
        }
      },
      onHover: (e, legendItem, legend) => {

        if (legendItem[0]) {
          let hoverTotal = transactions[legendItem[0].index].currentTotal;
          console.log('hovertotal', hoverTotal)
          const hoverDiff = (hoverTotal) - initial;
          const hoverPercDiff = formatDollarString(Math.abs((hoverDiff / initial) * 100));
          let hoverSign = '';
          if (Math.floor(hoverDiff) !== 0) hoverSign = (hoverDiff > 0 ? '+' : '');
          setHeadings(hoverTotal, hoverSign, hoverDiff, hoverPercDiff);
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
  )
}

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

export default PortfolioChart