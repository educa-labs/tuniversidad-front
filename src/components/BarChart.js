import React, { PropTypes } from 'react';
import round from '../helpers/round';
import '../styles/BarChart.css';


function BarChart(props) {
  function getWidth(value) {
    return `${round((value * 100) / props.max, 1)}%`;
  }
  const { avg, obj, last_cut } = props.scores;
  
  return (
    <div className="bar-chart">
      <div className="bar" style={{ width: getWidth(avg) }}>
        <div className="rectangle rectangle-1" >
          <div className="bar__label">Mi Puntaje</div>
          <div className="bar__value">{avg}</div>
        </div>
      </div>
      <div className="bar" style={{ width: getWidth(obj) }}>
        <div className=" rectangle rectangle-2">
          <div className="bar__label">Mi Objetivo</div>
          <div className="bar__value">{obj}</div>
        </div>
      </div>
      <div className="bar" style={{ width: getWidth(last_cut) }} >
        <div className=" rectangle rectangle-3">
          <div className="bar__label">Corte 2016</div>
          <div className="bar__value">{last_cut}</div>
        </div>
      </div>
    </div>
  );
}

BarChart.propTypes = {
  max: PropTypes.number.isRequired,
};

export default BarChart;
