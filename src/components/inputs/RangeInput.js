import React, { PropTypes } from 'react';
import { Range } from 'rc-slider';
import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';
import Handler from './Handler';
import '../../styles/RangeInput.css';


function RangeInput(props) {
  const wrapperStyle = { width: 400, margin: 50 };
  return (
    <div>
      <div style={wrapperStyle}>
        <p>Range with custom handle</p>
        <Range min={0} max={20} defaultValue={[3, 10]} handle={Handler} />
      </div>
    </div>
  );
}

RangeInput.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
};

export default RangeInput;
