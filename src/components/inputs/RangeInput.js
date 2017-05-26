import React, { PropTypes } from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Handler from './Handler';
import '../../styles/RangeInput.css';


function RangeInput(props) {
  const CustomHandler = restprops => (
    <Handler
      custom={props.custom}
      key={restprops.index}
      {...restprops}
    />
  );
  return (
    <div className="range-input-container">
      <span>{props.title}</span>
      <div className="range">
        <Range
          step={props.step}
          min={props.minValue}
          max={props.maxValue}
          defaultValue={[props.minValue, props.maxValue]}
          allowCross={false}
          handle={CustomHandler}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

RangeInput.propTypes = {
  step: PropTypes.number,
  custom: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
};

RangeInput.defaultProps = {
  custom: false,
  step: 1,
};

export default RangeInput;
