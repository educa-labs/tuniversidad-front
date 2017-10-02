import React from 'react';
import FlatButton from 'material-ui/FlatButton';

function AddFooter(Target) {
  return ({ handleNext, handleBack, disabled, ...props }) => (
    <div className="general-card">
      <Target {...props} />
      <div className="dialog-footer">
        <FlatButton
          label="Anterior"
          onTouchTap={handleBack}
          secondary
        />
        <FlatButton
          label="Continuar"
          onTouchTap={handleNext}
          secondary
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default AddFooter;
