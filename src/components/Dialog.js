import React, { cloneElement,  } from 'react';
import '../styles/Dialog.css';

function Dialog(props) {
  const title = props.title ? (
    <div className="dialog-title">
      {props.title}
    </div>
  ) : null;
  const actions = props.actions ? (
    <div className="dialog-footer">
      {props.actions.map((act, i) => (
        cloneElement(act, { key: i })
      ))}
    </div>
  ) : null;
  return (
    <div
      className={`dialog-container ${props.open ? '' : 'dialog-container-hide'}`}
      onClick={props.onRequestClose}
    >
      <div className="dialog-content" onClick={event => event.stopPropagation()}>
        {title}
        {props.children}
        {actions}
      </div>
    </div>
  );
}

export default Dialog;
