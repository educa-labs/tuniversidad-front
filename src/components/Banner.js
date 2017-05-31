import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { toggleShowLogin } from '../actions/compress';
import { clearState, logoutUser } from '../actions/user';
import { clearUser } from '../helpers/storage';
import '../styles/Banner.css';


function Banner(props, context) {
  function handleClick() {
    if (is.not.empty(props.error)) props.clearState();
    props.toggleShowLogin();
  }

  function handleLogout() {
    props.clearState();
    clearUser();
    context.router.replace('/');
  }
  const rightContent = (
    <FlatButton
      onTouchTap={is.null(props.user) ? handleClick : handleLogout}
      label={is.null(props.user) ? 'Inicia sesión' : 'Cerrar sesión'}
      labelStyle={{
        color: 'white',
      }}
      style={{
        margin: 'auto 1rem auto auto',
      }}
    />
    );

  const leftContent = is.not.null(props.title) ? (
    <div className="left-content">
      <IconButton onTouchTap={() => context.router.goBack()}>
        <ArrowBack color="white" />
      </IconButton>
      <div className="letf-content__title">{props.title}</div>
    </div>
  ) : null;

  return (
    <div className={`banner ${props.location === 'site' ? 'banner_site' : ''}`}>
      <div className={`banner__title ${props.location === 'site' ? 'banner__title_site' : ''}`} />
      {props.location === 'site' ? leftContent : null}
      {rightContent}
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
    user: state.user.currentUser,
    error: state.user.error,
  };
}

export default connect(mapStateToProps, {
  toggleShowLogin,
  clearState,
  logoutUser,
})(Banner);
