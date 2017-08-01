import React from 'react';
import Spinner from 'react-spinner-material';
import '../styles/Spinner.css';

function Loading() {
  return (
    <div className="loading">
      <Spinner
        width={20}
        height={20}
        spinnerColor="#0091EA"
        spinnerWidth={2}
        show
      />
    </div>
  );
}

export default Loading;
