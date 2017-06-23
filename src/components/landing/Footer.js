import React from 'react';
import IconButton from 'material-ui/IconButton';

function Footer(props) {
  return (
    <div className="landing-footer">
      <div className="tuni-logo-footer" />
      <div className="landing-footer-icons">
        <IconButton
          iconClassName="fa fa-facebook"
          iconStyle={{ color: '#FFFFFF' }}
        />
        <IconButton
          iconClassName="fa fa-instagram"
          iconStyle={{ color: '#FFFFFF' }}
        />
        <IconButton
          iconClassName="fa fa-youtube-play"
          iconStyle={{ color: '#FFFFFF' }}
        />
      </div>
      <div className="slogan">
        Todos los derechos reservados. Educalabs ltda. Por estudiantes, para estudiantes.
      </div>
      <div className="contacto">
        contacto@tuniversidad.cl
      </div>
    </div>
  );
}

export default Footer;
