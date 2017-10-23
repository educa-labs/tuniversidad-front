import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Close from 'material-ui/svg-icons/navigation/close';
import Check from 'material-ui/svg-icons/navigation/check';


const Swipeable = (Component, onAccept, onDecline, index) => props => (
  <SwipeableViews
    hysteresis={0.35}
    resistance
    index={index}
    onChangeIndex={(ind) => {
      if (ind === 0) onAccept();
      if (ind === 2) onDecline();
    }}
  >
    <div className="accept-view">
      <Check color="white" />
    </div>
    <Component {...props} />
    <div className="decline-view">
      <Close color="white" />
    </div>
  </SwipeableViews>
);

export default Swipeable;
