import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import '../../styles/RangeInput.css';


function RangeInput(props) {
  const logChange = (val, extreme) => {
    const newVal = Object.assign(props.value, {
      [extreme]: val === '' ? val : Number(val),
    });
    props.onChange(newVal);
  };

  return (
    <div className="col">
      <span className="range-input__title">{props.title}</span>
      <div className="row">
        <TextField
          type="number"
          floatingLabelText="Mínimo"
          onChange={(e, val) => logChange(val, 'min')}
          className="margin-right"
          value={props.value.min}
        />
        <TextField
          type="number"
          floatingLabelText="Máximo"
          onChange={(e, val) => logChange(val, 'max')}
          className="margin-left"
          value={props.value.max}
        />
      </div>
    </div>
  );
}

RangeInput.propTypes = {
  value: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }).isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RangeInput;
