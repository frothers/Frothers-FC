// import * as _ from 'lodash';
// import { Chart, Colors, TimeScale } from 'chart.js';
// import 'chartjs-adapter-luxon';
// import * as React from "react";
// import { useState } from 'react';
// import { Line } from "react-chartjs-2";

// // import * as moment from 'moment';
// // let enNZ = moment.locale("en-nz");
// // import 'chartjs-adapter-moment';

// import { parsePlayerData, parsePointsData, parseCleanSheetData, matchGoals, matchResult, cleanSheets, AllSquadName, parseAppearancesData, matchAppearances } from './processors/graphData'

// let screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

// let goalsChart: Chart<"line", matchGoals[], unknown>;
// let appearancesChart: Chart<"line", matchAppearances[], unknown>;
// let pointsChart: Chart<"line", matchResult[], unknown>;
// let cleanSheetChart: Chart<"line", cleanSheets[], unknown>;

// let re = /(\d+)\-(\w+)\-(\w+)/;
// const defaultColour = "#e6e6e6";

// Chart.defaults.color = defaultColour;
// Chart.register(Colors, TimeScale);

// export type YearSeason = {
//   year: number,
//   season: string,
//   squadName: string
// };

// /**
//  * @summary Get the filter value
//  */
// function getYearSeasonFilter(): YearSeason {
//     let input = <HTMLInputElement>document.getElementById("yearSelect");
//     if (input == null) {
//       return null;
//     }
//     let output: YearSeason;
//     if (input.value === "all") {
//       output = {
//         year: null,
//         season: null,
//         squadName: AllSquadName
//       }
//     }
//     else {
//       let regex = re.exec(input.value);

//       output = {
//         year: parseInt(regex[1]),
//         season: regex[2],
//         squadName: regex[3],
//       }
//     }

//     return output;
// }

// /**
//  * @summary Goal scorers graphics.
//  */
// export async function populateGsGraph(year: number, season: string, squadName: string) {
//     let playerData = await parsePlayerData(year, season, squadName);

//     let temp = <HTMLCanvasElement>document.getElementById("stats-panel");

//     if (temp == null) {
//         return;
//     }

//     let ctx = temp.getContext("2d");

//     if (goalsChart) {
//         goalsChart.destroy();
//     }

//     return (
//         <Line
//         datasetIdKey='id'
//         data={{
//         labels: ['Jun', 'Jul', 'Aug'],
//         datasets: [
//             {
//             id: 1,
//             label: '',
//             data: [5, 6, 7],
//             },
//             {
//             id: 2,
//             label: '',
//             data: [3, 2, 1],
//             },
//         ],
//         }}
//     />)

//     // goalsChart = new Chart(ctx, {
//     //     type: 'line',
//     //     data: {
//     //         datasets: playerData
//     //     },
//     //     options: {
//     //         elements: {
//     //             line: {
//     //                 tension: 0, // disables bezier curves
//     //             }
//     //         },
//     //         responsive: true,
//     //         maintainAspectRatio: false,
//     //         layout: {
//     //             padding: {
//     //                 left: 50,
//     //                 right: 50,
//     //                 top: 0,
//     //                 bottom: 0
//     //             }
//     //         },
//     //         plugins: {
//     //             legend: {
//     //                 display: screenWidth > 500,
//     //                 position: 'bottom',
//     //                 // onClick: onClickFunc
//     //             },
//     //         },
//     //         scales: {
//     //             x: {
//     //                 type: 'time',
//     //                 adapters: { 
//     //                     date: {
//     //                     //   locale: enNZ, 
//     //                     },
//     //                   },
//     //                 time: {
//     //                     unit: (year?'week':'year')
//     //                 }
//     //             },
//     //             y: {
//     //                 suggestedMin: 0,
//     //                 suggestedMax: 15,
                    
//     //             }
//     //         },
//     //         // tooltip: {
//     //         //     callbacks: {
//     //         //         title: function (items, data) {
//     //         //             let title = "";
//     //         //             items.forEach((item, index) => {
//     //         //                 title += data.datasets[item.datasetIndex].label;
//     //         //                 if (index != (items.length - 1)) {
//     //         //                     title += ", "
//     //         //                 }
//     //         //             })

//     //         //             return title
//     //         //         },
//     //         //         footer: function (item, data) {
//     //         //             let dataItem = <matchGoals>data.datasets[item[0].datasetIndex].data[item[0].index];
//     //         //             let yourDate = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(dataItem.t);
//     //         //             return yourDate
//     //         //         },
//     //         //         label: function (item, data) {
//     //         //             let dataItem = <matchGoals>data.datasets[item.datasetIndex].data[item.index];
//     //         //             return "Total:\t" + dataItem.y;
//     //         //         },
//     //         //         afterLabel: function (item, data) {
//     //         //             let dataItem = <matchGoals>data.datasets[item.datasetIndex].data[item.index];
//     //         //             return (year?"(Gameday Goals:\t":"(Season Goals:\t") + dataItem.goals + ")";
//     //         //         },
//     //         //     },
//     //         // }
//     //     }
//     // })
// }

// /**
//  * @summary Appearances graphics.
//  */
//  export let populateAppearancesGraph = async function (year: number, season: string, squadName: string) {
//     let temp = <HTMLCanvasElement>document.getElementById("appearances-panel");
//     let playerData = await parseAppearancesData(year, season, squadName);

//     if (temp == null) {
//         return;
//     }

//     let ctx = temp.getContext("2d");

//     if (appearancesChart) {
//         appearancesChart.destroy();
//     }

//     appearancesChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             datasets: playerData
//         },
//         options: {
//             elements: {
//                 line: {
//                     tension: 0, // disables bezier curves
//                 }
//             },
//             responsive: true,
//             maintainAspectRatio: false,
//             layout: {
//                 padding: {
//                     left: 50,
//                     right: 50,
//                     top: 0,
//                     bottom: 0
//                 }
//             },
//             plugins: {
//                 legend: {
//                     display: screenWidth > 500,
//                     position: 'bottom',
//                     // onClick: onClickFunc
//                 },
//             },
//             scales: {
//                 x: {
//                     type: 'time',
//                     adapters: { 
//                         date: {
//                         //   locale: enAU, 
//                         },
//                     },
//                     time: {
//                         unit: (year?'week':'year')
//                     }
//                 },
//                 y: {
//                     suggestedMin: 0,
//                     suggestedMax: 15,
                
//                 },
//             },
//             // tooltips: {
//             //     callbacks: {
//             //         title: function (items, data) {
//             //             let title = "";
//             //             items.forEach((item, index) => {
//             //                 title += data.datasets[item.datasetIndex].label;
//             //                 if (index != (items.length - 1)) {
//             //                     title += ", "
//             //                 }
//             //             })

//             //             return title
//             //         },
//             //         footer: function (item, data) {
//             //             let dataItem = <matchAppearances>data.datasets[item[0].datasetIndex].data[item[0].index];
//             //             let yourDate = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(dataItem.t);
//             //             return yourDate
//             //         },
//             //         label: function (item, data) {
//             //             let dataItem = <matchAppearances>data.datasets[item.datasetIndex].data[item.index];
//             //             return "Total:\t" + dataItem.y;
//             //         },
//             //         afterLabel: function (item, data) {
//             //             let dataItem = <matchAppearances>data.datasets[item.datasetIndex].data[item.index];
//             //             return (year?"(Gameday Appearance:\t":"(Season Appearances:\t") + dataItem.appearance + ")";
//             //         },
//             //     },
//             // }
//         },
//     })
// }

// /**
//  * @summary Points graphics.
//  */
// export let populatePointsGraph = async function (year: number, season: string, squadName: string) {
//     let pointsData = await parsePointsData(year, season, squadName);

//     let temp = <HTMLCanvasElement>document.getElementById("results-panel");

//     if (temp == null) {
//         return;
//     }
    
//     let ctx = temp.getContext("2d");

//     if (pointsChart) {
//         pointsChart.destroy();
//     }

//     pointsChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             datasets: [{
//                 data: pointsData,
//                 label: "Results",
//                 fill: false,
//                 stepped: true
//             }]
//         },
//         options: {
//             elements: {
//                 line: {
//                     tension: 0, // disables bezier curves
//                 }
//             },
//             responsive: true,
//             maintainAspectRatio: false,
//             layout: {
//                 padding: {
//                     left: 50,
//                     right: 50,
//                     top: 0,
//                     bottom: 0
//                 }
//             },
//             scales: {
//                 x: {
//                     type: 'time',
//                     adapters: { 
//                         date: {
//                         //   locale: enAU, 
//                         },
//                     },
//                     time: {
//                         unit: 'week'
//                     }
//                 },
//                 y: {
                    
//                         suggestedMin: 0,
//                         suggestedMax: 15,
                    
//                 }
//             },
//             plugins: {
//                 legend: {
//                     display: false
//                 },
//             },
//             // tooltips: {
//             //     callbacks: {
//             //         title: function (items, data) {
//             //             let title = "";
//             //             items.forEach((item, index) => {
//             //                 title += data.datasets[item.datasetIndex].label;
//             //                 if (index != (items.length - 1)) {
//             //                     title += ", "
//             //                 }
//             //             })

//             //             return title
//             //         },
//             //         footer: function (item, data) {
//             //             let dataItem = <matchResult>data.datasets[item[0].datasetIndex].data[item[0].index];
//             //             let yourDate = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(dataItem.t);
//             //             return yourDate
//             //         },
//             //         label: function (item, data) {
//             //             let dataItem = <matchResult>data.datasets[item.datasetIndex].data[item.index];
//             //             return "Points:\t" + dataItem.y;
//             //         },
//             //         afterLabel: function (item, data) {
//             //             let dataItem = <matchResult>data.datasets[item.datasetIndex].data[item.index];
//             //             return "(Gameday result:\t"+ dataItem.result + ")";
//             //         },
//             //     },
//             // }
//         }
//     })
// }

// /**
//  * @summary cleansheet graphics.
//  */
// export let populateCleanSheetGraph = async function (year: number, season: string, squadName: string) {
//     let data = await parseCleanSheetData(year, season, squadName);

//     let temp = <HTMLCanvasElement>document.getElementById("cleansheet-panel");

//     if (temp == null) {
//         return;
//     }

//     let ctx = temp.getContext("2d");

//     if (cleanSheetChart) {
//         cleanSheetChart.destroy();
//     }

//     cleanSheetChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             datasets: [{
//                 data: data,
//                 label: "Clean Sheets",
//                 fill: false,
//                 stepped: true
//             }]
//         },
//         options: {
//             elements: {
//                 line: {
//                     tension: 0, // disables bezier curves
//                 }
//             },
            
//             responsive: true,
//             maintainAspectRatio: false,
//             layout: {
//                 padding: {
//                     left: 50,
//                     right: 50,
//                     top: 0,
//                     bottom: 0
//                 }
//             },
//             scales: {
//                 x: {
//                     type: 'time',
//                     adapters: { 
//                         date: {
//                         //   locale: enAU, 
//                         },
//                     },
//                     time: {
//                         unit: 'week'
//                     }
//                 },
//                 y: {
                    
//                         suggestedMin: 0,
//                         suggestedMax: 5,
                    
//                 }
//             },
//             plugins: {
//                 legend: {
//                     position: 'bottom'
//                 },
//             },
//             // tooltips: {
//             //     callbacks: {
//             //         title: function (items, data) {
//             //             let title = "";
//             //             items.forEach((item, index) => {
//             //                 title += data.datasets[item.datasetIndex].label;
//             //                 if (index != (items.length - 1)) {
//             //                     title += ", "
//             //                 }
//             //             })

//             //             return title
//             //         },
//             //         footer: function (item, data) {
//             //             let dataItem = <matchResult>data.datasets[item[0].datasetIndex].data[item[0].index];
//             //             let yourDate = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(dataItem.t);
//             //             return yourDate
//             //         },
//             //         label: function (item, data) {
//             //             let dataItem = <matchResult>data.datasets[item.datasetIndex].data[item.index];
//             //             return "Total Clean Sheets:\t" + dataItem.y;
//             //         },
//             //     },
//             // }
//         }
//     })
// }

// /**
//  * @summary Update all graphs
//  */
// export let updateAllGraphs = async function (year: number, season: string, squadName: string) {
//     populateGsGraph(year, season, squadName);
//     populateAppearancesGraph(year, season, squadName);
//     populatePointsGraph(year, season, squadName);
//     populateCleanSheetGraph(year, season, squadName);
// }

// let onClickFunc = function (_e: any, legendItem: { datasetIndex: any; }) {
//     var index = legendItem.datasetIndex;
//     var ci = this.chart;
//     var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;

//     ci.data.datasets.forEach(function (_e: any, i: number) {
//         var meta = ci.getDatasetMeta(i);

//         if (i !== index) {
//             if (!alreadyHidden) {
//                 meta.hidden = meta.hidden === null ? !meta.hidden : null;
//             } else if (meta.hidden === null) {
//                 meta.hidden = true;
//             }
//         } else if (i === index) {
//             meta.hidden = null;
//         }
//     });

//     ci.update();
// }