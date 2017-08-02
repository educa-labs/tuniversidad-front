import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Dialog.css';

class Dialog extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      if (nextProps.open && nextProps.mobile && nextProps.form) {
        this.context.router.push(`site/profile/${nextProps.form}`);
      }
    }
  }
  render() {
    const { props } = this;
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
      <div className={`dialog-container ${props.open ? '' : 'dialog-container-hide'}`}>
        <div className={`dialog-content ${props.containerClassName ? props.containerClassName : ''} ${props.mobile ? 'dialog-content-mobile' : ''}`} onClick={event => event.stopPropagation()}>
          {title}
          {props.children}
          {actions}
        </div>
      </div>
    );
  }
}

Dialog.contextTypes = {
  router: PropTypes.object,
};

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  actions: PropTypes.arrayOf(PropTypes.node),
  open: PropTypes.bool.isRequired,
  containerClassName: PropTypes.string,
};

export default Dialog;
