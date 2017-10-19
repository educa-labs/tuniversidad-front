import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Check from 'material-ui/svg-icons/navigation/check';
import ExpandibleCard from '../ExpandibleCard';


const Recomentadion = ({ career, onAccept, onDecline, loading, mobile }) => (
  <div className="recomendation">
    <ExpandibleCard career={career} mobile={mobile} />
    {!mobile && (
      <IconButton onTouchTap={onAccept} disabled={loading}>
        <Check color="#424242" />
      </IconButton>
    )}
    {!mobile && (
      <IconButton onTouchTap={onDecline} disabled={loading}>
        <Close color="#424242" />
      </IconButton>
    )}
  </div>
);

Recomentadion.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

export default Recomentadion;
