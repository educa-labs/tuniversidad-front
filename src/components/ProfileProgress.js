import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import UserTest from './UserTest';

function PropfileProgress(props) {
  return (
    <div className="progress">
      <div className="general">
        <div className="col col-3">
          Graficos
        </div>
        <div className="col col-2">
          <UserTest />
        </div>
      </div>
      <div className="action-button">
        <FloatingActionButton secondary>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    </div>
  );
}

export default PropfileProgress;

