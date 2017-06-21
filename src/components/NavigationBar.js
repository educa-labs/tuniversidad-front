import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { toggleShowLogin } from '../actions/compress';
import { clearState, logoutUser } from '../actions/user';
import { clearUser } from '../helpers/storage';
import '../styles/NavigationBar.css';


function NavigationBar(props, context) {
  function handleClick() {
    if (is.not.empty(props.error)) props.clearState();
    props.toggleShowLogin();
  }

  const leftContent = is.not.null(props.title) ? (
    <div className="left-content">
      <IconButton onTouchTap={() => context.router.goBack()}>
        <ArrowBack color="#FFFFFF" />
      </IconButton>
      <div className="letf-content__title">{props.title}</div>
    </div>
  ) : null;

  return (
    <div className={`navigation-bar ${props.location === 'site' ? 'navigation-bar_site' : ''}`}>
      <div className={`navigation-bar__title ${props.location === 'site' ? 'navigation-bar__title_site' : ''}`} />
      {props.location === 'site' ? leftContent : null}
    </div>
  );
}

NavigationBar.propTypes = {
  toggleShowLogin: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  title: PropTypes.string,
};

NavigationBar.defaultProps = {
  user: null,
  title: null,
};

NavigationBar.contextTypes = {
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
})(NavigationBar);
