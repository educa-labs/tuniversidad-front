import React, { PropTypes } from 'react';
import '../styles/Cover.css';

function Cover({ compress, children }) {
  return (
    <div className={`cover ${compress ? 'compress' : ''}`}>
      <div className="title">Información de más de 100 universidades</div>
      <div className="children">{children}</div>
    </div>
  );
}

Cover.propTypes = {
  compress: PropTypes.bool.isRequired,
};

export default Cover;
