import React, { PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import is from 'is_js';

function ProfileBanner({ user, onClick, selected }) {
  const current = is.null(user) ? { first_name: 'Default', last_name: 'Name' } : user;
  return (
    <div className={`profile-banner ${selected ? 'profile-banner_selected' : ''}`}onClick={onClick}>
      <div className="profile-banner__picture">
        <Avatar size={70}>{`${current.first_name.charAt(0)}${current.last_name.charAt(0)}`}</Avatar>
      </div>
      <div className="profile-banner__name">{`${current.first_name} ${current.last_name}`}</div>
    </div>
  );
}

ProfileBanner.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default ProfileBanner;
