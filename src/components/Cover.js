import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/Cover.css';

function Cover() {
  return (
    <div className="cover">
      <div className="cover__title">Información de más de 100 universidades</div>
      <div className="cover__button">
        <RaisedButton
          label="¡Comienza ya!"
          backgroundColor="#0091EA"
          labelColor="#FFFFFF"
        />
      </div>
    </div>
  );
}

export default Cover;
