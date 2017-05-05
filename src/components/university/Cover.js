import React, { PropTypes } from 'react';

function Cover(props) {
  return (
    <div className="university-cover" style={{ background: `url(${props.src})` }}>
      <div className="content">
        <div className="title">{props.title}</div>
        <div className="subtitle">{props.subtitle}</div>
      </div>
    </div>
  );
}

Cover.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default Cover;
