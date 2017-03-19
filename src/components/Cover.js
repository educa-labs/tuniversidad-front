import React, { PropTypes } from 'react';
import '../styles/Cover.css';

function Cover({ compress }) {
  return (
    <div className={`cover ${compress ? 'compress' : ''}`}>
      <span>Información de más de 100 universidades</span>
    </div>
  );
}

Cover.propTypes = {
  compress: PropTypes.bool.isRequired,
};

export default Cover;
