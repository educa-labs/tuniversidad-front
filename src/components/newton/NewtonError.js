import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const NewtonError = ({ mobile, handleNext }) => (
  <section className={mobile ? 'newton-section-mobile' : 'newton-section'}>
    <div>
      <div className="newton-header">¡Oops algo salió mal!</div>
      <div className="newton-body">
        Intenta preguntando de nuevo.
      </div>
      <RaisedButton
        label="Volver"
        backgroundColor="#0091EA"
        labelColor="#FFFFFF"
        onTouchTap={handleNext}
      />
    </div>
    <div className="col align-center">
      <div className="newton-welcome" />
    </div>
  </section>
);

export default NewtonError;
