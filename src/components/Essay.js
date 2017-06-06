import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import is from 'is_js';


function Essay(props) {
  if (props.essays === null) {
    return (
      <div>
        Cargando ...
      </div>
    );
  }
  console.log(props.essays);
  console.log(is.empty(props.essays));
  function renderEssay(ess, index) {
    return (
      <div className="essay__score" key={index}>
        <div className="col col-1">
          <div>{ess.title}</div>
          <div className="label">{ess.date}</div>
        </div>
        <div className="col col-1">
          <div className="score">{ess.score}</div>
          <div className="label">Puntaje</div>
        </div>
      </div>
    );
  }
  const essays = props.essays.map((essay, index) => renderEssay(essay, index));
  return (
    <div>
      <div className="essay">
        <div className={`essay__header ${props.active ? 'essay__header_active' : ''}`} onClick={props.handleClick}>
          <div className="essay__title">{props.title}</div>
        </div>
        <div className={`essay__body ${props.active ? 'essay__body_active' : ''}`}>
          {is.empty(props.essays) ? (
            <div>
              No has agregado ensayos de {props.title}
            </div>
          ) : essays}
        </div>
      </div>
      <Divider />
    </div>
  );
}

Essay.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Essay;
