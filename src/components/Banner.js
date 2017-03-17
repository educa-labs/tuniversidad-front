import React, { PropTypes } from 'react';
import '../styles/Banner.css';


function Banner({ hide }) {
  return (
    <div className={`banner-container ${hide ? 'hide' : ''}`}>
      <div className="title" />
    </div>
  );
}

Banner.propTypes = {
  hide: PropTypes.bool.isRequired,
};

export default Banner;
