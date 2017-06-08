import React from 'react';
import UserInfo from './UserInfo';
import UserGoals from './UserGoals';
import UserObjectives from './UserObjectives';
import UserNemForm from './UserNemForm';
import UserObjectivesForm from './UserObjectivesForm';


function ProfileGeneral(props) {
  return (
    <div className="general">
      <UserNemForm open={props.missingInfo} handleSubmit={props.updateUser} />
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
          handleSubmit={(l, m, h, s) => props.updateUserObjectives(props.token, l, m, h, s)}
        />
      </div>
    </div>
  );
}

export default ProfileGeneral;
