import React from 'react';

function CoverBottom(props) {
  return (
    <div className="landing-cover-bottom">
      <div className={`landing-body-title${props.mobile ? '-mobile' : ''} color-white`}>App disponible en Google Play
      </div>
      <div className="row">
        <a className="app-store" href="#" />
        <a className="google-play" href="https://play.google.com/store/apps/details?id=cl.tuniversidad" />
      </div>
    </div>
  );
}

export default CoverBottom;
