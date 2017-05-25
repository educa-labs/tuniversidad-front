import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SideMenu from './SideMenu';
import '../styles/Site.css';


class Site extends Component {
  componentWillMount() {
    console.log(this.props.user);
  }

  render() {
    return (
      <div className="site">
        <SideMenu />
        {this.props.children}
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
