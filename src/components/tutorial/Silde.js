import React from 'react';
import PropTypes from 'prop-types';

const Slide = ({ children }) => (
  <div className="tutorial-slide">
    {children}
  </div>
);

Slide.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Slide;
