import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import RigthArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

function SwipeableView(props) {
  return (
    <div className="step">
      <div className="step__button">
        <IconButton>
          <LeftArrow />
        </IconButton>
      </div>
      <div className="step__content">
        {props.children}
      </div>
      <div className="step__button">
        <IconButton><RigthArrow /></IconButton>
      </div>
    </div>
  );
}

SwipeableView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SwipeableView;
