import { useState, useEffect } from "react";
import * as _ from "lodash";

import { Frother, getStaticsTable } from "./processors/graphData";

// function populateIndividualStats(){
//   let player = getPlayerName();
//   populateStats(player);
// }

interface LifetimeStatsProps {
  name: string;
  kitNumber: number;
  yearJoined: number;
}

const defaultFrother: Frother = {
  name: "froth",
  url: "",
  goals: 0,
  appearances: 0,
  assists: 0,
  motm: 0,
  dotd: 0,
  cleansheet: 0,
  wins: 0,
  losses: 0
}

function LifetimeStats({name , kitNumber, yearJoined }: LifetimeStatsProps) {
    const [state, setState] = useState<Frother>(defaultFrother);
    useEffect(() => {
        getStaticsTable().then(data => {
            
            let platerData:Frother = data.filter((e)=> {
              return e.name == name;
            })[0]
            setState(platerData)
        }
        );
    })
    return (
        <div className="life-stats">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Kit Number
                <span className="badge badge-primary badge-pill">{kitNumber}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Year Joined
                <span className="badge badge-primary badge-pill">{yearJoined}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Total Goals
                <span className="badge badge-primary badge-pill" id="total-goals">{state.goals}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Appearances
                <span className="badge badge-primary badge-pill" id="appearances">
                  {state.appearances}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Man of the Matches
                <span className="badge badge-primary badge-pill" id="motm">{state.motm}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Dick of the Days
                <span className="badge badge-primary badge-pill" id="dotd">{state.dotd}</span>
              </li>
            </ul>
        </div>
    );
}

export default LifetimeStats;
