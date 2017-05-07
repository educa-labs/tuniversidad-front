import React, { PropTypes } from 'react';
import SideMenu from './SideMenu';
import '../styles/Site.css';


function Site(props) {
  return (
    <div className="site-container">
      <SideMenu />
      <div className="children">
        {props.children}
      </div>
    </div>
  );
}

Site.defaultProps = {
  children: null,
};

Site.propTypes = {
  children: PropTypes.node,
};

export default Site;
