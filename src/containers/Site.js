import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SideMenu from './SideMenu';
import '../styles/Site.css';


class Site extends Component {
  render() {
    return (
      <div className="site-container">
        <SideMenu />
        <div className="children">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Site.defaultProps = {
  children: null,
};

Site.propTypes = {
  children: PropTypes.node,
};

export default Site;
