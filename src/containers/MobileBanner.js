import React from 'react';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import '../styles/MobileBanner.css';


function MobileBanner() {
  return (
    <div className="mobile-banner">
      <IconButton>
        <Menu color="#FFFFFF" />
      </IconButton>
      <div className="tuni-logo" />
    </div>
  );
}

export default MobileBanner;
