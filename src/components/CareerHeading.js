import React, { PropTypes, Component } from 'react';
import Divider from 'material-ui/Divider';

function CareerHeading({ title, subtitle, onClick }) {
  return (
    <div className="expandible-card" onTouchTap={onClick}>
      <div className="general-card__header">
        <div className="col">
          <div className="general-card__title title_no-margin">{title}</div>
          <button className="general-card__subtitle color-blue">{subtitle}</button>
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default CareerHeading;

