import React, { PropTypes } from 'react';
import UserInfo from './UserInfo';
import UserGoals from './UserGoals';
import UserObjectives from './UserObjectives';


function ProfileGeneral(props) {
  if (props.mobile) {
    return (
      <div className="col col-grey">
        <UserGoals
          removeGoal={id => props.removeGoal(id, props.token)}
          goals={props.goals}
          mobile={props.mobile}
        />
        <UserInfo
          user={props.user}
          updateUser={props.updateUser}
          token={props.token}
          mobile={props.mobile}
        />
        <UserObjectives
          objectives={props.objectives.objectives}
          user={props.user}
          handleSubmit={(l, m, h, s) => props.updateUserObjectives(props.token, l, m, h, s)}
          mobile={props.mobile}
        />
      </div>
    );
  }
  return (
    <div className="col col-row col-grey-desk">
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

ProfileGeneral.defaultProps = {
  mobile: false,
};

ProfileGeneral.propTypes = {
  mobile: PropTypes.bool,
};

export default ProfileGeneral;
