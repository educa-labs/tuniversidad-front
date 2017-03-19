import React, { PropTypes } from 'react';
import '../styles/Selector.css';

function Selector({ active, makeSelection }) {
  return (
    <div className="selector">
      <div
        onClick={() => makeSelection('universidades')}
        className={active === 'universidades' ? 'active' : null}
      >
        Universidades
      </div>
      <div
        onClick={() => makeSelection('carreras')}
        className={active === 'carreras' ? 'active' : null}
      >
        Carreras
      </div>
    </div>
  );
}

Selector.propTypes = {
  active: PropTypes.string.isRequired,
  makeSelection: PropTypes.func.isRequired,
};

export default Selector;
