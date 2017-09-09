import React from 'react';
import MediaQuery from 'react-responsive';
import '../../styles/Modal.css';

function Modal(DeskComponent, MobileComponent) {
  return ({ children, ...props }) => (
    <div>
      <MediaQuery maxDeviceWidth={720}>
        <MobileComponent {...props}>
          {children}
        </MobileComponent>
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

