import { useMemo, useState, useEffect } from "react";
import { LineChart, LineSeries } from '@mui/x-charts/LineChart';
import * as _ from "lodash";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { getAppearancesData, getOTDData } from "./apiQueries";
import { getPlayerAppearances, yearlyAppearances } from './processors/statsData'
import { parseGoalsData, parseAppearancesData, chartGoalsData, matchGoals, parseSquadData } from './processors/graphData'
import { legendClasses } from '@mui/x-charts/ChartsLegend';

import Goals from "./graphs/goalScorers"
import StatsTable from "./graphs/statsTable"


const defaultColour = "#e6e6e6";

interface YearlyStatsProps {
  name: string;
}

type ChartData = {
  t: Date,
  appearances: number,
  goals: number,
  assists: number,
}

function YearlyStatsGraph({ name }: YearlyStatsProps) {
  const [chartState, setChartState] = useState<ChartData[]>([]);

  useEffect(() => {
    parseSquadData(name).then(squadData => {
      setChartState(squadData)
    })
  })

  return (
    <div className="App">
      <LineChart
        sx={(theme) => ({
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
              stroke: defaultColour,
              strokeWidth: 3,
            },
            [`.${axisClasses.tickLabel}`]: {
              fill: defaultColour,
            },
          },
          [`.${legendClasses.root}`]: {
            [`.${legendClasses.label}`]: {
              color: defaultColour,
            },
          }
        })}
        xAxis={[{
          dataKey: 't',
          scaleType: 'time',
          tickMinStep: 3600 * 1000 * 24 * 365,
        }]}
        series={[{ dataKey: 'goals', label: 'Goals' }, { dataKey: 'assists', label: 'Assists' }, { dataKey: 'appearances', label: 'Appearances' }]}
        height={300}
        dataset={chartState}
      />
    </div>
  );
}

export default YearlyStatsGraph;
