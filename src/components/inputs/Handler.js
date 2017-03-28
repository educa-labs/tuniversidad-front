import React, { PropTypes } from 'react';
import Tooltip from 'rc-tooltip';
import { Handle } from 'rc-slider';
import 'rc-tooltip/assets/bootstrap.css';

function Handler(props) {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible
      placement="bottom"
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
