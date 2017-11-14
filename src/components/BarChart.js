import React, { PropTypes } from 'react';
import is from 'is_js';
import round from '../helpers/round';
import { makeList } from '../helpers/strings';
import '../styles/BarChart.css';


function BarChart(props) {
  function getWidth(value) {
    if (value === null) return 100;
    return `${round((value * 100) / props.max, 1)}%`;
  }
  const { avg, obj, last_cut } = props.scores;

  const missing = is.not.empty(props.missing) ? (
    <div className="bar-chart-missing" onClick={props.linkToProgress}>
      Agrega un ensayo de {makeList(props.missing)} para ver tu progreso.
    </div>
  ) : null;

  const barOne = (
    <div className="bar" style={{ width: getWidth(avg) }}>
      <div className="rectangle rectangle-1" >
        <div className="bar__label">Mi Puntaje</div>
        <div className="bar__value">{avg}</div>
      </div>
    </div>
  );
  
  return (
    <div className="bar-chart">
      {missing || barOne}
      <div className="bar" style={{ width: getWidth(obj) }}>
        <div className="rectangle rectangle-2">
          <div className="bar__label">Mi Objetivo</div>
          <div className="bar__value">{obj}</div>
        </div>
      </div>
      <div className="bar" style={{ width: getWidth(last_cut) }} >
        <div className=" rectangle rectangle-3">
          <div className="bar__label">Puntaje de corte</div>
          <div className="bar__value">{last_cut}</div>
        </div>
      </div>
    </div>
  );
}

BarChart.propTypes = {
  max: PropTypes.number.isRequired,
  missing: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BarChart;
