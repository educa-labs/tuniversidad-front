import React from 'react';
import UserInfo from './UserInfo';
import UserGoals from './UserGoals';
import UserTarget from './UserTarget';


function ProfileGeneral(props) {
  return (
    <div className="general">
      <div className="col col-3">
        <UserGoals {...props} />
      </div>
      <div className="col col-2">
        <UserInfo {...props} />
        <UserTarget {...props} />
      </div>
    </div>
  );
}

export default ProfileGeneral;
