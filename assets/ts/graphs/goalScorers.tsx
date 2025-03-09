import React, { PureComponent, useState } from 'react';
import {
  Label,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';

const initialData: any[] = [
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

const getAxisYDomain = (from: any, to: any, ref: string, offset: number) => {
  const refData = initialData.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

interface State {
    data: any[];
    left: string | number;
    right: string | number;
    refAreaLeft: string;
    refAreaRight: string;
    top: string | number;
    bottom: string  | number;
    top2: string  | number;
    bottom2: string  | number;
    animation: boolean;
}


export default function Goals() {
    
  const initState: State = {
    data: initialData,
    left: 'dataMin',
    right: 'dataMax',
    refAreaLeft: '',
    refAreaRight: '',
    top: 'dataMax+1',
    bottom: 'dataMin-1',
    top2: 'dataMax+20',
    bottom2: 'dataMin-20',
    animation: true,
  };
    
  const [graphState, setGraphState] = useState<State>(initState);

  function zoom() {

    let newGraphState = graphState;
    let refAreaRight = newGraphState.refAreaRight;
    let refAreaLeft = newGraphState.refAreaLeft;
    let data = newGraphState.data;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      newGraphState.refAreaLeft= '';
      newGraphState.refAreaRight = '';

      setGraphState(newGraphState)
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'Chris', 1);
    const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'Lance', 50);

    newGraphState.refAreaLeft = ''
    newGraphState.refAreaRight = ''
    newGraphState.data = data.slice()
    newGraphState.left = refAreaLeft
    newGraphState.right = refAreaRight
    newGraphState.bottom = bottom
    newGraphState.top = top
    newGraphState.bottom2 = bottom2
    newGraphState.top2 = top2

    setGraphState(newGraphState)
  }

  function zoomOut() {

    let newGraphState = graphState;
    newGraphState.data = graphState.data.slice();
    newGraphState.refAreaLeft = ''
    newGraphState.refAreaRight = ''
    newGraphState.left = 'dataMin'
    newGraphState.right = 'dataMax'
    newGraphState.top = 'dataMax+1'
    newGraphState.bottom = 'dataMin'
    newGraphState.top2 = 'dataMax+50'
    newGraphState.bottom2 = 'dataMin+50'
    setGraphState(newGraphState);
  }

  return (
    <div className="highlight-bar-charts" style={{ userSelect: 'none', width: '100%' }}>
      <button type="button" className="btn update" onClick={zoomOut.bind(this)}>
        Zoom Out
      </button>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={800}
          height={400}
          data={graphState.data}
          onMouseDown={(e) => {
            let newGraphState = graphState;
            newGraphState.refAreaLeft =  e.activeLabel 
            setGraphState(newGraphState)
          }}
          onMouseMove={(e) => {
            let newGraphState = graphState;
            newGraphState.refAreaRight =  e.activeLabel 
            graphState.refAreaLeft && setGraphState(newGraphState)
          }}
          // eslint-disable-next-line react/jsx-no-bind
          onMouseUp={zoom.bind(this)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis allowDataOverflow dataKey="year" domain={[graphState.left, graphState.right]} type="number" />
          <YAxis allowDataOverflow domain={[graphState.bottom, graphState.top]} type="number" yAxisId="1" />
          <YAxis orientation="right" allowDataOverflow domain={[graphState.bottom2, graphState.top2]} type="number" yAxisId="2" />
          <Tooltip />
          <Line yAxisId="1" type="natural" dataKey="Chris" stroke="#8884d8" animationDuration={300} />
          <Line yAxisId="2" type="natural" dataKey="Lance" stroke="#82ca9d" animationDuration={300} />

          {graphState.refAreaLeft && graphState.refAreaRight ? (
            <ReferenceArea yAxisId="1" x1={graphState.refAreaLeft} x2={graphState.refAreaRight} strokeOpacity={0.3} />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}