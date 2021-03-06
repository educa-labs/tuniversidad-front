import React, { PropTypes } from 'react';
import UserInfo from './UserInfo';
import UserGoals from './UserGoals';
import UserObjectives from './UserObjectives';


function ProfileGeneral(props) {
  if (props.mobile) {
    return (
      <div className="col">
        <UserGoals
          removeGoal={id => props.removeGoal(id, props.token)}
          goals={props.goals}
          mobile={props.mobile}
          essays={props.essays}
          linkToProgress={() => props.handleSlideChange(1)}
        />
        <UserInfo
          user={props.user}
          token={props.token}
          mobile={props.mobile}
          updateUser={props.updateUser}
        />
        <UserObjectives
          updateUser={props.updateUser}
          objectives={props.objectives.objectives}
          user={props.user}
          handleSubmit={(l, m, h, s) => props.updateUserObjectives(props.token, l, m, h, s)}
          mobile={props.mobile}
        />
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col col-3">
        <UserGoals
          removeGoal={id => props.removeGoal(id, props.token)}
          goals={props.goals}
          essays={props.essays}
          linkToProgress={() => props.handleSlideChange(1)}
        />
      </div>
      <div className="col col-2">
        <UserInfo
          user={props.user}
          token={props.token}
          updateUser={props.updateUser}
        />
        <UserObjectives
          updateUser={props.updateUser}
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
