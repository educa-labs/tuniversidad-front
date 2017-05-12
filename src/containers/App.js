import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import { getUser } from '../helpers/storage';
import { setupUser } from '../actions/user';
import { fetch } from '../actions/fetch';

class App extends Component {
  componentWillMount() {
    const user = getUser();
    this.props.fetch('areas', null, null);
    this.props.fetch('types', null, null);
    this.props.fetch('schedules', null, null);
    if (is.not.existy(user)) {
      this.context.router.replace('/');
    } else {
      this.props.setupUser(user);
    }
  }

  render() {
    return this.props.children;
  }
}

App.propTypes = {
  setupUser: PropTypes.func.isRequired,
  children: PropTypes.node,
  fetch: PropTypes.func.isRequired,
};

App.contextTypes = {
  router: PropTypes.object,
};

export default connect(null, {
  setupUser,
  fetch,
})(App);
