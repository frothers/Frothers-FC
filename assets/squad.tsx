import * as React from "react";
import { createRoot } from "react-dom/client";
import { VictoryChart, VictoryLine, VictoryVoronoiContainer } from "victory";
import { theme, colors } from "./ts/theme";
import * as _ from "lodash";
import { parsePlayerData } from "./ts/processors/graphData";
import {
  getPlayerAppearances,
  yearlyAppearances,
} from "./ts/processors/statsData";

export type Line = {
  data: { x: Date; y: number }[],
  label: string
};

/**
 * @summary Get the filter value
 */
export let getPlayerName = function (): string {
  let input = document.getElementById("individual-stats-panel");
  if (input == null) {
    return "";
  }
  return input.getAttribute("data-player-name");
};

/**
 * @summary Get player stats
 */
export let getStats = async function (name: string) {
  let totalGoals = 0;
  let allPlayerData = (await parsePlayerData()) || [];

  let playerData = _.find(allPlayerData, { label: name });

  if (playerData === undefined) {
    return;
  }

  playerData.data.forEach((game) => {
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

  gameAppearances.forEach((element) => {
    let arrayPos = _.findIndex(dataAppearances, ["year", element.year]);

    if (arrayPos > -1) {
      allAppearances[arrayPos].appearances =
        dataAppearances[arrayPos].appearances + element.appearances;
    } else {
      allAppearances.push(element);
    }
  });

  let appearances = dataAppearances.map((apps) => {
    let app = {
      x: new Date(apps.year, 1, 1),
      y: apps.appearances,
    };
    return app;
  });

  let totalAppearances = 0;
  appearances.forEach((app) => {
    totalAppearances = totalAppearances + app.y;
  });

  let appearancesElement = document.getElementById("appearances");

  // Set appearances string
  appearancesElement.innerText = totalAppearances.toString();

  let goals = playerData.data.map((goal) => {
    let year = new Date(goal.t).getFullYear();
    let point = {
      x: new Date(year, 1, 1),
      y: goal.goals,
    };
    return point;
  });

  // Populate missing appearance years
  goals.forEach((goalYear) => {
    if (0 > _.findIndex(appearances, { x: goalYear.x })) {
      let point = {
        x: goalYear.x,
        y: 0,
      };
      appearances.push(point);
    }
  });

  appearances.sort((a, b) => (a.x > b.x ? 1 : -1));

  let appearanceLine: Line = {
    data: appearances,
    label: "Appearances"
  };

  let goalsLine: Line = {
    data: goals,
    label: "Goals"
  };

  return [goalsLine, appearanceLine];
};

interface IProps {}

interface IState {
  stats?: Line[];
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      stats: [
        {
          label: "Test",
          data: [
            { x: new Date(2001), y: 12 },
            { x: new Date(2001), y: 10 },
            { x: new Date(2003), y: 11 },
            { x: new Date(2004), y: 5 },
            { x: new Date(2005), y: 4 },
          ],
        },
      ],
    };
  }

  async componentDidMount() {
    const playerName = getPlayerName();
    const stats = await getStats(playerName);
    this.setState({ stats: stats });
  }

  render() {
    return (
      <VictoryChart theme={theme} containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => `${datum.x.getFullYear()}, ${_.round(datum.y, 2)}`}    />}>
        {this.state.stats.map((stat, index) => {

          return (
            // @ts-ignore 
            <VictoryLine
              data={stat.data}
              scale={{ x: "time", y: "linear" }}
              x="x"
              y="y"
              label={stat.label}
              style={{
                data: { stroke: colors[index % colors.length], strokeWidth: 5 },
              }}
            />
          );
        })}
      </VictoryChart>
    );
  }
}

const container = document.getElementById("individual-stats-panel");
const root = createRoot(container!);
root.render(<App />);
