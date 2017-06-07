import React from 'react';
import UserInfo from './UserInfo';
import UserGoals from './UserGoals';
import UserTarget from './UserTarget';
import UserNemForm from './UserNemForm';


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
        <UserInfo {...props} />
        <UserTarget {...props} />
      </div>
    </div>
  );
}

export default ProfileGeneral;
