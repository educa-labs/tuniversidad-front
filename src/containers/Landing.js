import React, { Component, PropTypes } from 'react';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import is from 'is_js';
import Cover from '../components/landing/Cover';
import Body from '../components/landing/Body';
import NewtonSection from '../components/landing/NewtonSection';
import Register from '../components/Register';
import Login from '../components/Login';
import NavigationBar from '../components/NavigationBar';
import '../styles/Landing.css';

class Landing extends Component {
  componentWillMount() {
    if (is.not.null(this.props.user)) this.context.router.replace('/site/profile');
  }
  
  render() {
    return (
      <div>
        <MediaQuery maxDeviceWidth={720}>
          <NavigationBar location="landing" />
          <Cover mobile />
          <Body mobile />
          <NewtonSection mobile />
        </MediaQuery>
        <MediaQuery minDeviceWidth={721}>
          <NavigationBar location="landing" />
          <Cover />
          <Body />
          <NewtonSection />
        </MediaQuery>
      </div>
      
    );
  }
}

Landing.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.user.currentUser,
  };
}

export default connect(mapStateToProps)(Landing);
