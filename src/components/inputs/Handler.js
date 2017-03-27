import React, { PropTypes } from 'react';
import Tooltip from 'rc-tooltip';
import { Handle } from 'rc-slider';
import 'rc-tooltip/assets/bootstrap.css';

function Handler(props) {
  console.log(props)
  const { dragging, index, value, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      placement="bot"
      key={index}
    >
      <Handle {...restProps} />
    </Tooltip>
  );
}

Handler.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default Handler;
