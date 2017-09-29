import React from 'react';
import PropTypes from 'prop-types';

const ShareFB = ({ onClick, type }) => (
  <div id={type === 'twitter' ? 'twitter-button' : 'fb-button'} onTouchTap={onClick} className={`share ${type}`} />
);


ShareFB.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['facebook', 'twitter']).isRequired,
};

export default ShareFB;
