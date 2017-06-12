import React from 'react';
import UserInfo from './UserInfo';
import UserGoals from './UserGoals';
import UserObjectives from './UserObjectives';


function ProfileGeneral(props) {
  return (
    <div className="general">
      <div className="col col-3">
        <UserGoals
          removeGoal={id => props.removeGoal(id, props.token)}
          goals={props.goals}
        />
      </div>
      <div className="col col-2">
        <UserInfo
          user={props.user}
          updateUser={props.updateUser}
          token={props.token}
        />
        <UserObjectives
          objectives={props.objectives.objectives}
          user={props.user}
          handleSubmit={(l, m, h, s) => props.updateUserObjectives(props.token, l, m, h, s)}
        />
      </div>
    </div>
  );
}

export default ProfileGeneral;
