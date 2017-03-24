import React, { PropTypes } from 'react';
import PinSlider from './PinSlider';
import '../../styles/SliderInput.css';

function RangeInput(props) {
  return (
    <div className="range-input">
      <PinSlider
        currentValue={props.value[1]}
        step={props.step}
        handleClick={props.onMaxChange}
        minValue={props.minValue}
        maxValue={props.maxValue}
      />
      <div className="bar" />
      <PinSlider
        currentValue={props.value[0]}
        step={props.step}
        handleClick={props.onMinChange}
        minValue={props.minValue}
        maxValue={props.maxValue}
      />
    </div>
  );
}



RangeInput.propTypes = {
  onMaxChange: PropTypes.func.isRequired,
  onMinChange: PropTypes.func.isRequired,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ).isRequired,
};

RangeInput.defaultProps = {
  minValue: 0,
  maxValue: 19,
  step: 1,
};

export default RangeInput;
