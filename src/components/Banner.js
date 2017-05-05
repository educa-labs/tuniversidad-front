import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { toggleShowLogin } from '../actions/compress';
import { clearState } from '../actions/user';
import '../styles/Banner.css';


function Banner(props, context) {
  function handleClick() {
    if (is.not.empty(props.error)) props.clearState();
    props.toggleShowLogin();
  }
  const rightContent = is.null(props.user) ? (
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

  const leftContent = is.not.null(props.title) ? (
    <div className="left-content">
      <IconButton onTouchTap={() => context.router.goBack()}>
        <ArrowBack color="white" />
      </IconButton>
      <div className="title">{props.title}</div>
    </div>
  ) : null;

  return (
    <div className={`banner-container ${props.location === 'site' ? 'site' : ''}`}>
      <div className="title" />
      {props.location === 'site' ? leftContent : null}
      {props.location === 'landing' ? rightContent : null}
    </div>
  );
}

Banner.propTypes = {
  toggleShowLogin: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  user: PropTypes.object,
  title: PropTypes.string,
};

Banner.defaultProps = {
  user: null,
  title: null,
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
