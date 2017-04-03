import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import '../styles/Banner.css';


function Banner({ compress }) {
  return (
    <div className={`banner-container ${compress ? 'compress' : ''}`}>
      <div className="title" />
    </div>
  );
}

Banner.propTypes = {
  compress: PropTypes.bool,
};

Banner.defaultProps = {
  compress: false,
};

function mapStateToProps(state) {
  return {
    compress: state.compress,
  };
}

export default connect(mapStateToProps)(Banner);
