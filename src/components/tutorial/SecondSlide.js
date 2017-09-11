import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import DatePicker from '../inputs/DatePicker';

const Second = ({
  handleDateChange,
  date,
  error,
  handleRutChange,
  rut,
}) => (
  <div className="slide">
    <div className="slide-header">¿Cuándo naciste?</div>
    <div className="slide-body">
      <div className="slide-col">
        <DatePicker
          handleChange={handleDateChange}
          date={date}
          errorText={error.date || ''}
        />
        <TextField
          onChange={(e, val) => handleRutChange(val)}
          floatingLabelText="Rut"
          hintText="18918496-4"
          value={rut}
          errorText={error.rut || ''}
          fullWidth
        />
        <div className="input-help">Ejemplo: 18918496-4</div>
      </div>
    </div>
  </div>
);

Second.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  handleRutChange: PropTypes.func.isRequired,
  date: PropTypes.string,
  rut: PropTypes.string,
  error: PropTypes.object,
};

export default Second;
