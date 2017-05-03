import React from 'react';
import Avatar from 'material-ui/Avatar';

function ProfileBanner() {
  return (
    <div className="profile-banner">
      <div className="box">
        <div className="picture">
          <Avatar size={70}>IW</Avatar>
        </div>
        <div className="name"> Iván Wolf </div>
      </div>
    </div>
  );
}

export default ProfileBanner;
