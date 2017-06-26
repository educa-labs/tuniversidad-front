import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import '../../styles/RangeInput.css';

function RangeInput(props) {
  return (
    <div className="range-input">
      <span className="range-input__title">{props.title}</span>
      <div className="range">
        <InputRange {...props} />
      </div>
    </div>
  );
}

RangeInput.defaultProps = {
  custom: false,
  step: 1,
};

export default RangeInput;
