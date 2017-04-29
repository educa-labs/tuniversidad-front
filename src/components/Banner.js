import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import FlatButton from 'material-ui/FlatButton';
import { toggleShowLogin } from '../actions/compress';
import { clearState } from '../actions/user';
import '../styles/Banner.css';


function Banner(props, context) {
  function handleClick() {
    if (is.not.empty(props.error)) props.clearState();
    props.toggleShowLogin();
  }
  const innerContent = is.null(props.user) ? (
    <FlatButton
      onTouchTap={handleClick}
      label="Inicia sesión"
      labelStyle={{
        color: 'white',
      }}
      style={{
        margin: 'auto 1rem auto auto',
      }}
    />
    ) : null;
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
  clearState: PropTypes.func.isRequired,
  user: PropTypes.object,
  error: PropTypes.object.isRequired,
};

Banner.defaultProps = {
  compress: false,
  user: null,
};

Banner.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    compress: state.compress,
    user: state.user.currentUser,
    error: state.user.error,
  };
}

export default connect(mapStateToProps, {
  toggleShowLogin,
  clearState,
})(Banner);
