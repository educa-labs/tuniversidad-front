import React, { PropTypes } from 'react';
import UserInfo from './UserInfo';
import UserGoals from './UserGoals';

function ProfileGeneral(props) {
  return (
    <div className="general">
      <div className="col col-3">
        <UserGoals goals={props.goals} />
      </div>
      <div className="col col-2">
        <UserInfo user={props.user} />
        <div className="puntajes">
          Puntajes
        </div>
      </div>
    </div>
  );
}

export default ProfileGeneral;
