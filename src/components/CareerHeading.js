import React from 'react';
import Divider from 'material-ui/Divider';

function CareerHeading({ title, subtitle, onClick, mobile }) {
  return (
    <div className={`expandible-card cursor ${mobile ? '' : 'expandible-card-desk' }`} onTouchTap={onClick}>
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

