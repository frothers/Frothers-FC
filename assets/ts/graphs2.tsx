import React, {  useId, useState, FormEventHandler } from 'react';
import * as _ from "lodash";

import Goals from "./graphs/goalScorers"
import StatsTable from "./graphs/statsTable"

function App() {
  const [seasonState, setSeasonState] = useState("all");

  const handleInput: FormEventHandler<HTMLSelectElement> = (e) => {
    if (e.target instanceof HTMLSelectElement) {
      const newValue = e.target.value;
      setSeasonState(newValue);
    }
  };

  return (
    <div className="App">
      <div className="text-center">
        <h2>Frothers Statistics</h2>
      </div>

      <section id="tabs">
        <div className="container">
          <div className="row">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text">
                  Year
                </label>
              </div>
              <select className="custom-select" onInput={handleInput} name="selectedYear" defaultValue="all">
<option value="2025-summer-ogfrothers">
                  2025 - Summer (OG Frothers)
                </option>
                <option value="2024-summer-ogfrothers">
                <option value="2025-winter-ogfrothers">
                  2025 - Winter (OG Frothers)
                </option>
                <option value="2024-summer-ogfrothers">
                  2024 - Summer (OG Frothers)
                </option>
                <option value="2024-winter-ogfrothers">
                  2024 - Winter (OG Frothers)
                </option>
                <option value="2023-winter-ogfrothers">
                  2023 - Winter (OG Frothers)
                </option>
                <option value="2022-winter-ogfrothers">
                  2022 - Winter (OG Frothers)
                </option>
                <option value="2021-summer-foamgenerators">
                  2021 - Summer (Foam Generators)
                </option>
                <option value="2021-summer-ogfrothers">
                  2021 - Summer (OG Frothers)
                </option>
                <option value="2021-winter-ogfrothers">
                  2021 - Winter (OG Frothers)
                </option>
                <option value="2020-winter-ogfrothers">
                  2020 - Winter (OG Frothers)
                </option>
                <option value="2019-winter-ogfrothers">
                  2019 - Winter (OG Frothers)
                </option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <StatsTable season={seasonState}></StatsTable>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
