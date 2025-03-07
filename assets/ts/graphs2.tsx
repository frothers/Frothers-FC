import React from "react";
import { useId } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import * as _ from "lodash";

function App() {
    const yearSelectedId = useId();

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
                <label className="input-group-text" htmlFor={yearSelectedId}>
                  Year
                </label>
              </div>
              <select className="custom-select" id={yearSelectedId} name="selectedYear" defaultValue="2024-summer-ogfrothers">
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
              <nav>
                <div
                  className="nav nav-tabs nav-fill"
                  id="nav-tab"
                  role="tablist"
                >
                  <a
                    className="nav-item nav-link active"
                    id="nav-goals-tab"
                    data-toggle="tab"
                    href="#nav-goals"
                    role="tab"
                    aria-controls="nav-goals"
                    aria-selected="true"
                  >
                    Goals
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-appearances-tab"
                    data-toggle="tab"
                    href="#nav-appearances"
                    role="tab"
                    aria-controls="nav-appearances"
                    aria-selected="false"
                  >
                    Appearances
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-points-tab"
                    data-toggle="tab"
                    href="#nav-points"
                    role="tab"
                    aria-controls="nav-points"
                    aria-selected="false"
                  >
                    Points
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-cleansheet-tab"
                    data-toggle="tab"
                    href="#nav-cleansheet"
                    role="tab"
                    aria-controls="nav-cleansheet"
                    aria-selected="false"
                  >
                    Clean Sheets
                  </a>
                </div>
              </nav>
              <div
                className="tab-content py-4 px-4 px-sm-0"
                id="nav-tabContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="nav-goals"
                  role="tabpanel"
                  aria-labelledby="nav-goals-tab"
                >
                  <div className="text-center graph">
                    <canvas id="stats-panel"></canvas>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-appearances"
                  role="tabpanel"
                  aria-labelledby="nav-appearances-tab"
                >
                  <div className="text-center graph">
                    <canvas
                      id="appearances-panel"
                      data-appearances="{{ $appearances | jsonify}}"
                    ></canvas>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-points"
                  role="tabpanel"
                  aria-labelledby="nav-points-tab"
                >
                  <div className="text-center graph">
                    <canvas id="results-panel"></canvas>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-cleansheet"
                  role="tabpanel"
                  aria-labelledby="nav-cleansheet-tab"
                >
                  <div className="text-center graph">
                    <canvas id="cleansheet-panel"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
