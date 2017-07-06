import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import '../styles/Dialog.css';

function Dialog(props) {
  console.log(props.open);
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
  const handleClick = () => {
    console.log('click');
    //props.onRequestClose();
  };

  return (
    <div
      className={`dialog-container ${props.open ? '' : 'dialog-container-hide'}`}
      onClick={handleClick}
    >
      <div className={`dialog-content ${props.containerClassName ? props.containerClassName : ''}`} onClick={event => event.stopPropagation()}>
        {title}
        {props.children}
        {actions}
      </div>
    </div>
  );
}

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  actions: PropTypes.arrayOf(PropTypes.node),
  open: PropTypes.bool.isRequired,
  containerClassName: PropTypes.string,
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Dialog;
