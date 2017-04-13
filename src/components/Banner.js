import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { toggleShowLogin } from '../actions/compress';
import '../styles/Banner.css';


function Banner(props, context) {
  const innerContent = (
    <FlatButton
      onTouchTap={props.toggleShowLogin}
      label="Inicia sesión"
      labelStyle={{
        color: 'white',
      }}
      style={{
        margin: 'auto 1rem auto auto',
      }}
    />
    );
  return (
    <div className={`banner-container ${props.compress ? 'compress' : ''}`}>
      <div className="title" />
      {context.router.location.pathname === '/' ? innerContent : null}
    </div>
  );
}

Banner.propTypes = {
  compress: PropTypes.bool,
  toggleShowLogin: PropTypes.func.isRequired,
};

Banner.defaultProps = {
  compress: false,
};

Banner.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    compress: state.compress,
  };
}

export default connect(mapStateToProps, {
  toggleShowLogin,
})(Banner);
