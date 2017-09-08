import React from 'react';
import '../../styles/Modal.css';

function Modal(Target) {
  return ({ children, ...props }) => (
    <div className="modal-overlay">
      <div className="modal-content animated slideInDown">
        <Target {...props}>
          {children}
        </Target>
      </div>
    </div>
  );
}


export default Modal;

