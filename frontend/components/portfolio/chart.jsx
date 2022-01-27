// import React from 'react';

// export default class Chart extends React.Component {
//   constructor(props) {
//     super(props);


//     this.state = {
//       currentTotal: 0,
//       // difference: 0,
//       transactions: [],
//       chart: '',
//       interval: 'Today'
//     }
//     // this.updateSummary = this.updateSummary.bind(this);
//   }

//   chartData() {
//     return {
//       labels: this.props.transactions.map(action => action.createdAt),
//       datasets: [
//         {
//           data: this.props.transactions.map(action => action.currentTotal),
//           fill: false,
//           borderColor: 'green',
//           tension: 0.4,
//         }
//       ]
//     }
//   }

//   chartOptions() {
//     const date = (tooltipItem) => {
//       let time = new Date(tooltipItem.label)
//       return time.toDateString().split(' ').slice(1).join(' ');
//     }


//     return {
//       scales: {
//         x: {
//           ticks: { display: false }
//         },
//         y: {
//           ticks: {
//             display: false,
//             beginAtZero: false
//           },
//         }
//       },
//       // onHover: (e, legendItem, legend) => {
//       //   if(legendItem[0]) {
//       //     this.setState({ currentTotal: this.props.transactions[legendItem[0].index].currentTotal })
//       //   }
//       //   console.log(e, legendItem, legend)
//       //   if (e.chart) {
//       //     const ctx = e.chart.ctx;
//       //     console.log(e.chart);
//       //     ctx.save();
//       //     // const activePoint = chart.tooltip._active[0];
//       //     // console.log(activePoint)
//       //     ctx.beginPath();
//       //     ctx.moveTo(e.x, 0);
//       //     ctx.lineTo(e.x, e.chart.chartArea.height);
//       //     ctx.lineWidth = 2;
//       //     ctx.strokeStyle = 'white';
//       //     ctx.stroke();
//       //     ctx.restore();
//       //   }
//       // },
//       plugins: {
//         legend: {
//           display: false,
//         },
//         tooltip: {
//           displayColors: false,
//           yAlign: top,
//           mode: 'nearest',
//           callbacks: {
//             label: date,
//             labelTextColor: () => 'green',
//             labelColor: () => ({ backgroundColor: 'transparent' }),
//             title: () => ''
//           }
//         }
//       },
//     }
//   }

//   componentDidUpdate() {
//     const tooltipLine = {
//       id: 'tooltipLine',
//       beforeDraw: chart => {
//         if (chart.tooltip._active && chart.tooltip._active.length) {
//           console.log(chart)
//           const ctx = chart.ctx;
//           ctx.save();
//           const activePoint = chart.tooltip._active[0];
//           // console.log(activePoint)
//           ctx.beginPath();
//           ctx.moveTo(activePoint.element.x, 0);
//           ctx.lineTo(activePoint.element.x, chart.chartArea.height);
//           ctx.lineWidth = 2;
//           ctx.strokeStyle = 'white';
//           ctx.stroke();
//           ctx.restore();
//         }
//       }
//     }

//     const config = {
//       type: 'line',
//       data: this.chartData(),
//       options: this.chartOptions(),
//       plugins: [tooltipLine]
//     };

//     $('#myChart').remove();
//     $('#chartDiv').append("<canvas id='myChart' width={600} height={200}/>");
//     const canvas = document.getElementById('myChart');
//     if (canvas) {
//       // const ctx = canvas.getContext('2d');
//       const myChart = new Chart(canvas, config)
//     }
//   }

//   renderTotal() {
    

//     return (
//       <div className='difference'>
//         <span>{symbol}{Math.abs(difference).toLocaleString("en-US")} ({symbol}{`${percDiff}%`})</span>
//         <span> {this.state.interval}</span>
//       </div>
//     )
//   }

//   onClick() {

//   }



//   render() {
//     if (!this.props.transactions.length) return null;

//     return (

//       <div className='chart'>


//         <div className='totalValue'>{this.state.currentTotal}</div>
//         {this.renderTotal()}


//         <div id='chartDiv'>
//           <canvas id='myChart' width={600} height={200} />
//         </div>


//         <div className='chartOptions'>
//           <span className='nav-link'>1D</span>
//           <span className='nav-link'>1W</span>
//           <span className='nav-link'>1M</span>
//           <span className='nav-link'>3M</span>
//           <span className='nav-link'>1Y</span>
//           <span className='nav-link'>ALL</span>
//         </div>

//       </div>
//     )
//   }
// }