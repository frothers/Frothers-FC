import * as React from 'react'
import { createRoot } from 'react-dom/client';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Colors,
  ChartDataset,
  CategoryScale,
  LinearScale,
  Tick,
  PointElement,
  Point,
  LineElement,
  Title,
  Tooltip,
  Legend,
  defaults
} from 'chart.js';
import * as _ from 'lodash';
import { parsePlayerData } from './ts/processors/graphData'
import { getPlayerAppearances, yearlyAppearances } from './ts/processors/statsData'

const defaultColour = "#e6e6e6";
defaults.color = defaultColour;

ChartJS.register(
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


/**
 * @summary Get the filter value
 */
export let getPlayerName = function (): string {
  let input = document.getElementById("individual-stats-panel");
  if (input == null) {
    return;
  }
  return input.getAttribute("data-player-name");
}

/**
 * @summary Get player stats
 */
export let getStats = async function (name: string) {
  let totalGoals = 0;
  let allPlayerData = await parsePlayerData() || [];

  let playerData = _.find(allPlayerData, { "label": name });

  if (playerData === undefined) {
    return;
  }

  playerData.data.forEach(game => {
    totalGoals = game.goals + totalGoals;
  });

  let goalsElement = document.getElementById("total-goals");

  // Set Goals string
  goalsElement.innerText = totalGoals.toString();

  // Populate graph
  let chartData = document.getElementById("individual-stats-panel");
  let b = chartData.getAttribute("data-appearances");
  let dataAppearances: yearlyAppearances[] = JSON.parse(b);
  let gameAppearances = await getPlayerAppearances(name);

  let allAppearances = dataAppearances;

  gameAppearances.forEach(element => {
    let arrayPos = _.findIndex(dataAppearances, ["year", element.year]);

    if (arrayPos > -1) {
      allAppearances[arrayPos].appearances = dataAppearances[arrayPos].appearances + element.appearances;
    }
    else {
      allAppearances.push(element);
    }
  });

  let appearances = dataAppearances.map(apps => {
    let app: Point = {
      x: apps.year,
      y: apps.appearances
    }
    return app;
  });

  let totalAppearances = 0;
  appearances.forEach(app => {
    totalAppearances = totalAppearances + app.y;
  })

  let appearancesElement = document.getElementById("appearances");

  // Set appearances string
  appearancesElement.innerText = totalAppearances.toString();

  let goals = playerData.data.map(goal => {
    let point: Point = {
      x: new Date(goal.t).getFullYear(),
      y: goal.goals
    }
    return point;
  })

  // Populate missing appearance years
  goals.forEach(goalYear => {
    if (0 > _.findIndex(appearances, { "x": goalYear.x })) {
      let point: Point = {
        x: goalYear.x,
        y: 0
      }
      appearances.push(point);
    }
  })

  appearances.sort((a, b) => (a.x > b.x) ? 1 : -1)

  let appearanceLine: ChartDataset<"scatter", (number | Point)[]> = {
    label: "Appearances",
    backgroundColor: "#3e95cd",
    showLine: true,
    data: appearances
  }

  let goalsLine: ChartDataset<"scatter", (number | Point)[]> = {
    label: "Goals",
    backgroundColor: "#8e5ea2",
    showLine: true,
    data: goals
  }

  return [goalsLine, appearanceLine]
}

export const options = {
  elements: {
    line: {
      tension: 0, // disables bezier curves
      fill: true
    }
  },
  locale: 'en-NZ',
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 50,
      right: 50,
      top: 0,
      bottom: 0
    }
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      suggestedMin: 2017,
      suggestedMax: 2023,
      ticks: {
        stepSize: 1,
        callback: function (tickValue: number | string, index: number, ticks: Tick[]) {
          return String(tickValue);
        }
      }
    },
    y: {

      beginAtZero: true,
      suggestedMin: 0,
      suggestedMax: 15,

    }
  },

};

interface IProps {
}

interface IState {
  stats?: ChartDataset<"scatter", (number | Point)[]>[];
}

class App extends React.Component<IProps, IState>  {
  constructor(props: IProps) {
    super(props);

    this.state = {
      stats: []
    };
  }

  async componentDidMount() {
    const playerName = getPlayerName();
    const stats = await getStats(playerName);
    this.setState({ stats: stats });
  }

  // const labels = ['Goals', 'Appearances'];
  render() {
    return <Scatter options={options} data={{ datasets: this.state.stats }} />;
  }
}

const container = document.getElementById('individual-stats-panel');
const root = createRoot(container!);
root.render(<App />);