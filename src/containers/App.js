import React, { Component, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import is from 'is_js';
import { getUser } from '../helpers/storage';
import { setupUser } from '../actions/user';
import { fetch } from '../actions/fetch';
import { CAREER, UNIVERSITY } from '../constants/strings';
import { getMostPopular } from '../actions/search';
import '../styles/Tuni.css';

class App extends Component {
  componentWillMount() {
    const user = getUser();
    if (is.null(this.props.areas)) this.props.fetch('areas', null, null);
    if (is.null(this.props.types)) this.props.fetch('types', null, null);
    if (is.null(this.props.schedules)) this.props.fetch('schedules', null, null);
    if (is.null(this.props.subjects)) this.props.fetch('subjects', null, null);
    if (is.null(this.props.regions)) this.props.fetch('regions', null, null);
    if (is.null(this.props.universities)) this.props.fetch('universities', null, null);
    if (is.empty(this.props.popularCareers)) this.props.getMostPopular(CAREER, null);
    if (is.empty(this.props.popularUniv)) this.props.getMostPopular(UNIVERSITY, null);
    if (is.existy(user)) {
      this.props.setupUser(user);
    } else if (this.props.location.pathname.indexOf('site') > -1) {
      this.context.router.replace('/search');
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.user);
  }

  render() {
    if (is.null(this.props.children)) return <div>Cargando...</div>;
    return (
      <div>
        <MediaQuery maxDeviceWidth={720}>
          {cloneElement(this.props.children, { mobile: true })}
        </MediaQuery>
        <MediaQuery minDeviceWidth={721}>
          {this.props.children}
        </MediaQuery>
      </div>
    );
  }
}

App.propTypes = {
  setupUser: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  fetch: PropTypes.func.isRequired,
  getMostPopular: PropTypes.func.isRequired,
};

App.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.user.currentUser,
    areas: state.fetch.areas,
    types: state.fetch.types,
    schedules: state.fetch.schedules,
    subjects: state.fetch.subjects,
    regions: state.fetch.regions,
    universities: state.fetch.universities,
    popularCareers: state.search.popular_careers,
    popularUniv: state.search.popular_univ,
  };
}

export default connect(mapStateToProps, {
  setupUser,
  fetch,
  getMostPopular,
})(App);
