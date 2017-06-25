import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

function Cover(props) {
  return (
    <div className={`landing-cover ${props.mobile ? 'landing-cover-mobile' : ''}`}>
      <div className={`landing-cover-title ${props.mobile ? 'landing-cover-title-mobile' : ''}`}>Toda la infromación que buscas.</div>
      <div className={`landing-cover-title ${props.mobile ? 'landing-cover-title-mobile' : ''}`}>En un solo lugar.</div>
      <div className={`landing-cover-subtitle ${props.mobile ? 'landing-cover-subtitle-mobile' : ''}`}>
        En tuniversidad podrás encontrar información completa de universidades y sus carreras. Además ofrecemos una serie de herramientas que te ayudarán a escoger qué y dónde estudiar.
      </div>
      <div className="row">
        <RaisedButton
          onTouchTap={() => console.log('hola')}
          label="Inicia Sesión"
          backgroundColor="#0091EA"
          labelColor="#FFFFFF"
          style={{
            marginRight: '5px',
            borderRadius: '6px',
          }}
        />
        <RaisedButton
          onTouchTap={() => console.log('hola')}
          label="Regístrate"
          backgroundColor="#424242"
          labelColor="#FFFFFF"
          style={{ 
            marginLeft: '5px',
            borderRadius: '6px',
          }}
        />
      </div>
    </div>
  );
}

export default Cover;
