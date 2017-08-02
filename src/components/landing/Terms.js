import React from 'react';

function Terms(props) {
  return (
    <div className="login-container">
      <div className={`general-card general-card_no-hover ${props.mobile ? 'general-card-full-size' : ''}`}>
        Hola
      </div>
    </div>
  );
}

export default Terms;
