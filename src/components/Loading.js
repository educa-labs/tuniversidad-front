import React from 'react';
import Spinner from 'react-spinner-material';

function Loading() {
  return (
    <div>
      <Spinner
        width={20}
        height={20}
        spinnerColor="#333"
        spinnerWidth={2}
        show
      />
    </div>
  );
}

export default Loading;
