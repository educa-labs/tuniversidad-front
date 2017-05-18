import React, { PropTypes } from 'react';
import SideMenu from './SideMenu';
import Banner from '../components/Banner';
import '../styles/Site.css';


function Site(props) {
  return (
    <div className="site">
      <SideMenu />
      {props.children}
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
