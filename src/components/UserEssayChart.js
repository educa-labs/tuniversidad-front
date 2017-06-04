import React from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Line, ReferenceLine } from 'recharts';

function CustomizedLabel(props) {
  const { x, y, stroke, value } = props;
  return <text x={x} y={y} dy={-8} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
}

function CustomizedReferenceLabel(props) {
  const { x, y, stroke, value } = props;
  return <text x={x} y={y} dy={-8} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
}

const subjects = {
  1: 'Lenguaje',
  2: 'Matemáticas',
  3: 'Historia',
  4: 'Ciencias Naturales',
};

function UserEssayChart(props) {
  return (
    <div className="general-card">
      <div className="general-card__header">
        <div className="general-card__title">Mi progreso en {subjects[props.active]}</div>
      </div>
      <div className="general-card__chart">
        <LineChart width={600} height={300} data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" type="category" padding={{ left: 30, right: 30 }} />
          <YAxis domain={['dataMin - 100', 850]} padding={{ top:30, bottom: 30 }} />
          <Tooltip />
          <ReferenceLine y={600} stroke="#424242" strokeDasharray="3 3" label={<CustomizedLabel />} />
          <Line type="basisOpen" dataKey="score" stroke="#0091EA" label={<CustomizedLabel />} dot={{ strokeWidth: 2 }} />
        </LineChart>
      </div>
    </div>
  );
}

export default UserEssayChart;
