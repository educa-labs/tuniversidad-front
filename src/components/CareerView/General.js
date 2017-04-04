import React from 'react';
import ResultCard from '../ResultCard';

function General(props) {
  return (
    <div className="general-info">
      <ResultCard career={props.career} general />
    </div>
  );
}

export default General;
