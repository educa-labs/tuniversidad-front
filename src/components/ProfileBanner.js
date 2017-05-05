import React from 'react';
import Avatar from 'material-ui/Avatar';
import is from 'is_js';

function ProfileBanner({ user }) {
  const current = is.null(user) ? { first_name: 'Default', last_name: 'Name' } : user;
  return (
    <div className="profile-banner">
      <div className="box">
        <div className="picture">
          <Avatar size={70}>{`${current.first_name.charAt(0)}${current.last_name.charAt(0)}`}</Avatar>
        </div>
        <div className="name">{`${current.first_name} ${current.last_name}`}</div>
      </div>
    </div>
  );
}

export default ProfileBanner;
