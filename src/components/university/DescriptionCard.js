import React from 'react';
import PropTypes from 'prop-types';

function Description({ text, mobile }) {
  return (
    <div className="univ-card">
      <div className="univ-card-header">Descripción</div>
      <div className="general-card">
        <div className="general-card-description">
          {text}
        </div>
      </div>
    </div>
  );
}

Description.defaultProps = {
  mobile: false,
};

Description.propTypes = {
  text: PropTypes.string.isRequired,
  mobile: PropTypes.bool,
};

export default Description;
