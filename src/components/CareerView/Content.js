import React, { PropTypes } from 'react';

function Content(props) {
  return (
    <div className="content">
      <div className="tabs">
        <div
          className={`tab ${props.active === 0 ? 'active' : ''}`}
          onClick={() => props.onTabClick(0)}
        >
          Información General
        </div>
        <div
          onClick={() => props.onTabClick(1)}
          className={`tab ${props.active === 1 ? 'active' : ''}`}
        >
          Malla Curricular
        </div>
        <div
          onClick={() => props.onTabClick(2)}
          className={`tab ${props.active === 2 ? 'active' : ''}`}
        >
          Preguntas y Respuestas
        </div>
      </div>
      {props.children[props.active]}
    </div>
  );
}

Content.propTypes = {
  active: PropTypes.number.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default Content;
