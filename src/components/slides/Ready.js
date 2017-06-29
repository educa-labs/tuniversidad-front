import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

function Ready(props) {
  return (
    <div className={`slide ${props.mobile ? 'slide-mobile' : ''}`}>
      <div className="slide-header">
        ¡Estamos listos!
      </div>
      <div className="col padding-2 align-center">
        <RaisedButton
          label="Comenzar"
          backgroundColor="#0091EA"
          labelColor="#FFFFFF"
          onTouchTap={props.onSubmit}
          style={{ marginTop: '6.5rem' }}
        />
      </div>
    </div>
  );
}

export default Ready;
