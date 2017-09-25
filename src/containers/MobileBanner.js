import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import '../styles/MobileBanner.css';


function MobileBanner({ onClick, location, guest }, context) {
  return (
    <div className={`mobile-banner ${location === 'news' ? 'mobile-banner-news' : ''} ${guest ? 'mobile-banner-guest' : ''}`}>
      {guest ? null : (
        <IconButton onTouchTap={onClick}>
          <Menu color="#FFFFFF" />
        </IconButton>
      )}
      <div className="tuni-logo" />
      {guest ? (
        <FlatButton
          label="Inicia Sesión"
          labelStyle={{ color: '#FFFFFF' }}
          onTouchTap={() => context.router.push('/login')}
        />
        ) : null}
    </div>
  );
}

MobileBanner.contextTypes = {
  router: PropTypes.object,
};

MobileBanner.defaultProps = {
  onClick: null,
};

MobileBanner.propTypes = {
  onClick: PropTypes.func,
};

export default MobileBanner;
