import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Close from 'material-ui/svg-icons/navigation/close';
import Check from 'material-ui/svg-icons/navigation/check';

/*
onSwitching={(index, type) => {
      if (type === 'end') {
        console.log('termino el switch', index);
        if (index === 0) onAccept();
        if (index === 2) onDecline();
      }
    }}
*/

const Swipeable = (Component, onAccept, onDecline, index) => props => (
  <SwipeableViews
    hysteresis={0.25}
    resistance
    index={index}
    onChangeIndex={(index) => {
      if (index === 0) {
        console.log('Antes de aceptar');
        onAccept();
      }
      if (index === 2) onDecline();
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
