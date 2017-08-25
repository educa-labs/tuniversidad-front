import React from 'react';

function Newton({ mobile }) {
  return (
    <div className="col">
      <div className={`general-card ${mobile ? '' : 'general-card_desk'}`}>
        <div className="general-card__header">
          <div className="general-card__title">Muy pronto te ayudaré a encontrar tu carrera ideal.</div>
        </div>
      <div className="newton-ulala" />
      </div>
    </div>
  );
}

export default Newton;
