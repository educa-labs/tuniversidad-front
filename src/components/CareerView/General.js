import React, { PropTypes } from 'react';
import ResultCard from '../ResultCard';

function General(props) {
  return (
    <div className="general-info">
      <ResultCard career={props.career} general />
      <div className="description">
        {props.career.info.description}
      </div>
    </div>
  );
}

General.propTypes = {
  career: PropTypes.object.isRequired,
};

export default General;
