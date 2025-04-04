import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';



interface ChartGoalsData {
  year: number,
  Chris: number,
  Lance: number
}

const initialData: ChartGoalsData[] = [
  { year: 1, Chris: 4.11, Lance: 100 },
  { year: 2, Chris: 2.39, Lance: 120 },
  { year: 3, Chris: 1.37, Lance: 150 },
  { year: 4, Chris: 1.16, Lance: 180 },
  { year: 5, Chris: 2.29, Lance: 200 },
  { year: 6, Chris: 3, Lance: 499 },
  { year: 7, Chris: 0.53, Lance: 50 },
  { year: 8, Chris: 2.52, Lance: 100 },
  { year: 9, Chris: 1.79, Lance: 200 },
  { year: 10, Chris: 2.94, Lance: 222 },
  { year: 11, Chris: 4.3, Lance: 210 },
  { year: 12, Chris: 4.41, Lance: 300 },
  { year: 13, Chris: 2.1, Lance: 50 },
  { year: 14, Chris: 8, Lance: 190 },
  { year: 15, Chris: 0, Lance: 300 },
  { year: 16, Chris: 9, Lance: 400 },
  { year: 17, Chris: 3, Lance: 200 },
  { year: 18, Chris: 2, Lance: 50 },
  { year: 19, Chris: 3, Lance: 100 },
  { year: 20, Chris: 7, Lance: 100 },
];

const getAxisYDomain = (from: number, to: number, ref: keyof ChartGoalsData, offset: number): [number, number] => {
  const refData = initialData.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

interface ExampleState {
  data: ChartGoalsData[];
  left: number | 'dataMin';
  right: number | 'dataMax';
  refAreaLeft: number | string;
  refAreaRight: number | string;
  top: number | string;
  bottom: number | string;
  top2: number | string;
  bottom2: number | string;
  animation: boolean;
}

export default class Example extends PureComponent<{}, ExampleState> {
  static demoUrl = 'https://codesandbox.io/p/sandbox/highlight-zoom-line-chart-rrj8f4';

  constructor(props: {}) {
    super(props);
    this.state = {
      data: initialData,
      left: 'dataMin',
      right: 'dataMax',
      refAreaLeft: '',
      refAreaRight: '',
      top: 'dataMax+1',
      bottom: 'dataMin-1',
      top2: 'dataMax+50',
      bottom2: 'dataMin-50',
      animation: true,
    };
  }

  zoom() {
    let { refAreaLeft, refAreaRight } = this.state;
    const { data } = this.state;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState({
        refAreaLeft: '',
        refAreaRight: '',
      });
      return;
    }

    // xAxis domain
    if (typeof refAreaLeft === 'number' && typeof refAreaRight === 'number' && refAreaLeft > refAreaRight) {
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
    }
    if (typeof refAreaLeft === 'number' && typeof refAreaRight === 'number') {
      // yAxis domain
      const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'Chris', 1);
      const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'Lance', 50);

      this.setState({
        refAreaLeft: '',
        refAreaRight: '',
        data: data.slice(),
        left: refAreaLeft,
        right: refAreaRight,
        bottom,
        top,
        bottom2,
        top2,
      });
    }
  }

  zoomOut() {
    const { data } = this.state;
    this.setState({
      data: data.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin-1',
      top2: 'dataMax+50',
      bottom2: 'dataMin-50',
    });
  }

  render() {
    const { data, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = this.state;

    return (
      <div className="highlight-bar-charts" style={{ userSelect: 'none', width: '100%' }}>
        <button type="button" className="btn update" onClick={this.zoomOut.bind(this)}>
          Zoom Out
        </button>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={800}
            height={400}
            data={data}
            onMouseDown={(e) => this.setState({ refAreaLeft: e.activeLabel })}
            onMouseMove={(e) => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
            onMouseUp={this.zoom.bind(this)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis allowDataOverflow dataKey="name" domain={[left, right]} type="number" />
            <YAxis allowDataOverflow domain={[bottom, top]} type="number" yAxisId="1" />
            <YAxis orientation="right" allowDataOverflow domain={[bottom2, top2]} type="number" yAxisId="2" />
            <Tooltip />
            <Line yAxisId="1" type="natural" dataKey="cost" stroke="#8884d8" animationDuration={300} />
            <Line yAxisId="2" type="natural" dataKey="impression" stroke="#82ca9d" animationDuration={300} />

            {typeof refAreaLeft === 'number' && typeof refAreaRight === 'number' ? (
              <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}