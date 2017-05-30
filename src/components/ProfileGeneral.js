import React, { PropTypes } from 'react';
import UserInfo from './UserInfo';
import UserGoals from './UserGoals';
import UserTest from './UserTest';

function ProfileGeneral(props) {
  return (
    <div className="general">
      <div className="col col-3">
        <UserGoals {...props} />
      </div>
      <div className="col col-2">
        <UserInfo user={props.user} />
        <UserTest />
      </div>
    </div>
  );
}

export default ProfileGeneral;
