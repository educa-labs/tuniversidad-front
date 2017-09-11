import React from 'react';
import MediaQuery from 'react-responsive';
import './Modal.css';

function Modal(DeskComponent, MobileComponent) {
  return ({ children, ...props }) => (
    <div>
      <MediaQuery maxDeviceWidth={720}>
        <div className="modal-fullscreen">
          <MobileComponent {...props}>
            {children}
          </MobileComponent>
        </div>
      </MediaQuery>
      <MediaQuery minDeviceWidth={721}>
        <div className="modal-overlay">
          <div className="modal-content animated slideInDown">
            <DeskComponent {...props}>
              {children}
            </DeskComponent>
          </div>
        </div>
      </MediaQuery>
    </div>
  );
}


export default Modal;

