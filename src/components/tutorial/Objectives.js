import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const Objectives = ({
  handleLanguageChange,
  handleHistoryChange,
  handleMathChange,
  handleScienceChange,
  language,
  math,
  science,
  history,
  error,
}) => (
  <div className="slide">
    <div className="slide-header">¿Cuánto quieres sacar en la PSU?</div>
    <div className="slide-body">
      <div className="slide-col">
        Ingresa los puntajes que quieres obtener en cada prueba. Este paso es opcional.
        <div className="row">
          <div className="col margin-right">
            <TextField
              onChange={(e, val) => handleLanguageChange(val)}
              floatingLabelText="Lenguaje"
              value={language}
              type="number"
              errorText={error.language}
              fullWidth
            />
            <TextField
              onChange={(e, val) => handleHistoryChange(val)}
              floatingLabelText="Historia"
              value={history}
              type="number"
              errorText={error.history}
              fullWidth
            />
          </div>
          <div className="col margin-left">
            <TextField
              onChange={(e, val) => handleMathChange(val)}
              floatingLabelText="Matemáticas"
              value={math}
              type="number"
              errorText={error.math}
              fullWidth
            />
            <TextField
              fullWidth
              onChange={(e, val) => handleScienceChange(val)}
              floatingLabelText="Ciencias"
              value={science}
              type="number"
              errorText={error.science}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

Objectives.propTypes = {
  handleHistoryChange: PropTypes.func.isRequired,
  handleLanguageChange: PropTypes.func.isRequired,
  handleMathChange: PropTypes.func.isRequired,
  handleScienceChange: PropTypes.func.isRequired,
  math: PropTypes.string.isRequired,
  science: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  error: PropTypes.object,
};

export default Objectives;
