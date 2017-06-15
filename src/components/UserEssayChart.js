import React from 'react';
import is from 'is_js';
import { LineChart, XAxis, YAxis, Tooltip, Line, CartesianGrid } from 'recharts';

function CustomizedLabel(props) {
  const { x, y, stroke, value } = props;
  return <text x={x} y={y} dy={-8} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
}


function UserEssayChart(props) {
  if (is.null(props.subjects)) {
    return (
      <div>
        Cargando ...
      </div>
    );
  }
  
  const subjects = {};
  props.subjects.forEach(sub => (
    subjects[sub.id] = sub.title
  ));

  const data = props.essays[props.active];
  const width = props.mobile ? 300 : 700;
  const height = props.mobile ? 220 : 400;

  const noContent = (
    <div className="general-card__no-content">
      <div className="newton-pensando" />
      <div className="general-card__empty-msg">
        Aún no has agregado un ensayo de {subjects[props.active]}.
      </div>
    </div>
  );

  const chart = (
    <LineChart width={width} height={height} data={data.essays} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="date" type="category" padding={{ left: 30, right: 30 }} width={320} />
      <YAxis domain={['dataMin - 100', 850]} padding={{ top: 30, bottom: 30 }} tick={!props.mobile} tickSize={props.mobile? 0 : 6} />
      <Tooltip />
      <CartesianGrid strokeDasharray="4 4" />
      <Line name="Puntaje" type="basis" dataKey="score" stroke="#0091EA" label={<CustomizedLabel />} dot={{ strokeWidth: 2 }} />
    </LineChart>
  );
  
  const header = props.mobile ? null : (
    <div className="general-card__header">
      <div className="general-card__title">Mi progreso en {subjects[props.active]}</div>
    </div>
  );

  return (
    <div className={`general-card ${props.mobile ? '' : 'general-card_desk'}`}>
      {header}
      <div className="general-card__chart">
        {is.empty(data.essays) ? noContent : chart}
      </div>
    </div>
  );
}

export default UserEssayChart;
