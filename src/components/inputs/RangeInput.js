import React, { PropTypes } from 'react';
import Slider, { createSliderWithTooltip, Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Handler from './Handler';
import '../../styles/RangeInput.css';


const ToolRange = createSliderWithTooltip(Range);


function RangeInput(props) {
  const wrapperStyle = { width: 400, margin: 50 };
  return (
    <div>
      <div style={wrapperStyle}>
        <p>Slider with custom handle</p>
        <Slider min={0} max={20} defaultValue={3} handle={Handler} />
      </div>
      <div style={wrapperStyle}>
        <p>Range with custom handle</p>
        <ToolRange min={0} max={20} defaultValue={[3, 10]} handle={Handler} />
      </div>
    </div>
  );
}

RangeInput.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
};

export default RangeInput;
