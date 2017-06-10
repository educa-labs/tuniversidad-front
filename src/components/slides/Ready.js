import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

function Ready(props) {
  return (
    <div className="slide">
      <div className="slide-header">
        ¡Estamos listos!
      </div>
      <div className="slide-body slide-body-ready">
        <div className="slide-button">
          <RaisedButton
            label="Comenzar"
            backgroundColor="#0091EA"
            labelColor="white"
          />
        </div>
      </div>
    </div>
  );
}

export default Ready;
