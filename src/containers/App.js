import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import { getUser } from '../helpers/storage';
import { setupUser } from '../actions/user';

class App extends Component {
  componentWillMount() {
    const user = getUser();
    if (is.existy(user)) {
      this.props.setupUser(user);
      this.context.router.push('/site');
    }
  }

  render() {
    return this.props.children;
  }
}

App.propTypes = {
  setupUser: PropTypes.func.isRequired,
  children: PropTypes.node,
};

App.contextTypes = {
  router: PropTypes.object,
};

export default connect(null, {
  setupUser,
})(App);
