import React from 'react';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import '../styles/MobileBanner.css';


function MobileBanner({ onClick }) {
  return (
    <div className="mobile-banner">
      <IconButton onTouchTap={onClick}>
        <Menu color="#FFFFFF" />
      </IconButton>
      <div className="tuni-logo" />
    </div>
  );
}

export default MobileBanner;
