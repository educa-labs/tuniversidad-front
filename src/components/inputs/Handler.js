import React, { PropTypes } from 'react';
import Tooltip from 'rc-tooltip';
import { Handle } from 'rc-slider';
import 'rc-tooltip/assets/bootstrap.css';
import numeral from '../../helpers/numeral';

function Handler(props) {
  const { value, dragging, custom, index, ...restProps } = props;
  let placement = 'bottom';
  if (custom) {
    if (index === 0) placement = 'bottom';
    if (index === 1) placement = 'top';
  }
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={custom ? `$${numeral(value)}` : value}
      visible
      placement={placement}
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
};

export default Handler;
