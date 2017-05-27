import React, { PropTypes } from 'react';
import round from '../helpers/round';
import '../styles/BarChart.css';

const data = {
  me: 613,
  goal: 670,
  cut: 647,
};


function BarChart(props) {
  function getWidth(value) {
    return `${round((value * 100) / props.max, 1)}%`;
  }
  return (
    <div className="bar-chart">
      <div className="bar">
        <div className="rectangle rectangle-1" style={{ width: getWidth(data.me) }}>
          <div className="bar__label">Mi Puntaje</div>
          <div className="bar__value">{data.me}</div>
        </div>
      </div>
      <div className="bar">
        <div className=" rectangle rectangle-2" style={{ width: getWidth(data.goal) }}>
          <div className="bar__label">Mi Objetivo</div>
          <div className="bar__value">{data.goal}</div>
        </div>
      </div>
      <div className="bar">
        <div className=" rectangle rectangle-3" style={{ width: getWidth(data.cut) }}>
          <div className="bar__label">Corte 2016</div>
          <div className="bar__value">{data.cut}</div>
        </div>
      </div>
    </div>
  );
}

BarChart.propTypes = {
  max: PropTypes.number.isRequired,
};

export default BarChart;
