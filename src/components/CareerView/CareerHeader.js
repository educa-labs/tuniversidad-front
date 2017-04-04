import React, { PropTypes } from 'react';
import '../../styles/CareerView.css';

function CareerHeader({ title, subtitle }) {
  return (
    <div className="career-header">
      <span className="title">{title}</span><br />
      <span>{subtitle}</span>
    </div>
  );
}

CareerHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default CareerHeader;
