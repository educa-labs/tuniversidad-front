import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import '../styles/MobileBanner.css';


function MobileBanner({ onClick, location }) {
  return (
    <div className={`mobile-banner ${location === 'news' ? 'mobile-banner-news' : ''}`}>
      <IconButton onTouchTap={onClick}>
        <Menu color="#FFFFFF" />
      </IconButton>
      <div className="tuni-logo" />
    </div>
  );
}

MobileBanner.propTypes = {
  location: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MobileBanner;
