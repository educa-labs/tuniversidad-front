import React from 'react';
import PropTypes from 'prop-types';
import Close from 'material-ui/svg-icons/navigation/close';
import '../styles/Tag.css';

function Tag({ title, onClose }) {
  return (
    <div className="tag">
      <span className="tag-name">{title}</span>
      <div className="circle">
        <Close color="#0091EA" onClick={onClose} style={{ transform: 'scale(0.7)' }} />
      </div>
    </div>
  );
}

Tag.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Tag;
