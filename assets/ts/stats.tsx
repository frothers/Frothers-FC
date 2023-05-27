// import * as _ from 'lodash';
// import { Chart, ChartDataset } from 'chart.js/auto';
// import { parsePlayerData } from './processors/graphData'
// import { getPlayerAppearances, yearlyAppearances } from './processors/statsData'

// let careerChart: Chart;

// const defaultColour = "#e6e6e6";

// Chart.defaults.color = defaultColour;

// /**
//  * @summary Get the filter value
//  */
// export let getPlayerName = function (): string {
//   let input = <HTMLElement>document.getElementById("individual-stats-panel");
//   if (input == null) {
//     return;
//   }
//   return input.getAttribute("data-player-name");
// }

// /**
//  * @summary populate player stats
//  */
// export let populateStats = async function (name: string) {
//   let totalGoals = 0;
//   let allPlayerData = await parsePlayerData() || [];

//   let playerData = _.find(allPlayerData, { "label": name });

//   if (playerData === undefined){ 
//     return;
//   }

//   playerData.data.forEach(game => {
//     totalGoals = game.goals + totalGoals;
//   });

//   let goalsElement = <HTMLElement>document.getElementById("total-goals");

//   // Set Goals string
//   goalsElement.innerText = totalGoals.toString();

//   // Populate graph
//   let chartData = <HTMLElement>document.getElementById("individual-stats-panel");
//   let b = chartData.getAttribute("data-appearances");
//   let dataAppearances: yearlyAppearances[] = JSON.parse(b);
//   let gameAppearances = await getPlayerAppearances(name);

//   let allAppearances = dataAppearances;

//   gameAppearances.forEach(element => {
//     let arrayPos = _.findIndex(dataAppearances, ["year", element.year]);

//     if (arrayPos > -1) {
//       allAppearances[arrayPos].appearances = dataAppearances[arrayPos].appearances + element.appearances;
//     }
//     else {
//       allAppearances.push(element);
//     }
//   });

//   let appearances = dataAppearances.map(apps => {
//     let app = {
//       x: apps.year,
//       y: apps.appearances
//     }
//     return app;
//   });

//   let totalAppearances = 0;
//   appearances.forEach(app => {
//     totalAppearances = totalAppearances + <number>app.y;
//   })

//   let appearancesElement = <HTMLElement>document.getElementById("appearances");

//   // Set appearances string
//   appearancesElement.innerText = totalAppearances.toString();



//   let goals = playerData.data.map(goal => {
//     let point = {
//       x: new Date (goal.t).getFullYear(),
//       y: goal.goals
//     }
//     return point;
//   })

//   // Populate missing appearance years
//   goals.forEach(goalYear => {
//     if (0 > _.findIndex(appearances, {"x": goalYear.x})) {
//       let point = {
//         x: goalYear.x,
//         y: 0
//       }
//       appearances.push(point);
//     }
//   })

//   appearances.sort((a, b) => (a.x > b.x) ? 1 : -1)

//   let appearanceLine: ChartDataset = {
//     label: "Appearances",
//     fill: false,
//     showLine: true,
//     borderColor: "#3e95cd",
//     data: appearances
//   }

//   let goalsLine: ChartDataset = {
//     label: "Goals",
//     borderColor: "#8e5ea2",
//     fill: false,
//     showLine: true,
//     data: goals
//   }


//   let careerPanel = <HTMLCanvasElement>document.getElementById("career-panel");

//   if (careerPanel == null) {
//     return;
//   }

//   let ctx = careerPanel.getContext("2d");

//   if (careerChart) {
//     careerChart.destroy();
//   }

//   careerChart = new Chart(ctx, {
//     type: 'scatter',
//     data: {
//       "datasets": [appearanceLine, goalsLine],
//     },
//     options: {
//       elements: {
//         line: {
//           tension: 0, // disables bezier curves
//         }
//       },
//       responsive: true,
//       maintainAspectRatio: false,
//       layout: {
//         padding: {
//           left: 50,
//           right: 50,
//           top: 0,
//           bottom: 0
//         }
//       },
//       plugins: {
//         legend: {
//             display: true,
//             position: 'bottom',
            
//           },
//       },
//       scales: {
//         x: {
          
//             suggestedMin: 2017,
//             suggestedMax: 2021,
//             ticks: {stepSize: 1}
            
          
//         },
//         y: {
          
//             beginAtZero:true,
//             suggestedMin: 0,
//             suggestedMax: 15,
          
//         }
//       },
//     }
//   })
// }
