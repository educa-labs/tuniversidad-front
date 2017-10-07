import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Check from 'material-ui/svg-icons/navigation/check';
import ExpandibleCard from '../ExpandibleCard';


const Recomentadion = ({ career, onAccept, onDecline }) => (
  <div className="recomendation">
    <ExpandibleCard career={career} />
    <IconButton onTouchTap={onAccept}>
      <Check color="#424242" />
    </IconButton>
    <IconButton onTouchTap={onDecline}>
      <Close color="#424242" />
    </IconButton>
  </div>
);

Recomentadion.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

export default Recomentadion;
