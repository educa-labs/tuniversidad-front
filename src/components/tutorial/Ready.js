import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Ready = ({ handleSubmit }) => (
  <div className="slide">
    <div className="slide-header">¡Estamos listos!</div>
    <div className="row align-center justify-center">
      <RaisedButton
        label="Comenzar"
        backgroundColor="#0091EA"
        labelColor="#FFFFFF"
        onTouchTap={handleSubmit}
      />
    </div>
  </div>
);

export default Ready;
