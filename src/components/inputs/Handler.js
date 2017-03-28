import React, { PropTypes } from 'react';
import Tooltip from 'rc-tooltip';
import { Handle } from 'rc-slider';
import 'rc-tooltip/assets/bootstrap.css';

function Handler(props) {
  const { value, dragging, hide, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls={`rc-slider-tooltip${hide ? ' hide' : ''}`}
      overlay={value}
      visible
      placement="bottom"
      key={index}
      destroyTooltipOnHide
    >
      <Handle {...restProps} />
    </Tooltip>
  );
}

Handler.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  hide: PropTypes.bool.isRequired,
};

export default Handler;
