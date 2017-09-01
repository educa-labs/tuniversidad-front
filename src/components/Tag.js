import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';

function Tag({ title, onClose }) {
  return (
    <div className="tag">
      <div className="tag-name">{title}</div>
      <IconButton onTouchTap={onClose}><Close /></IconButton>
    </div>
  );
}

Tag.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Tag;
