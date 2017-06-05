import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import { getUser } from '../helpers/storage';
import { setupUser } from '../actions/user';
import { fetch } from '../actions/fetch';

class App extends Component {
  componentWillMount() {
    const user = getUser();
    if (is.null(this.props.areas)) this.props.fetch('areas', null, null);
    if (is.null(this.props.types)) this.props.fetch('types', null, null);
    if (is.null(this.props.schedules)) this.props.fetch('schedules', null, null);
    if (is.null(this.props.subjects)) this.props.fetch('subjects', null, null);
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

function mapStateToProps(state) {
  return {
    areas: state.fetch.areas,
    types: state.fetch.types,
    schedules: state.fetch.schedules,
    subjects: state.fetch.subjects,
  };
}

export default connect(mapStateToProps, {
  setupUser,
  fetch,
})(App);
