import React from 'react';

function CoverBottom(props) {
  return (
    <div className="landing-cover-bottom">
      <div className={`landing-body-title${props.mobile ? '-mobile' : ''} color-white`}>App disponible en Julio
      </div>
      <div className="row">
        <div className="app-store" />
        <div className="google-play" />
      </div>
    </div>
  );
}

export default CoverBottom;
