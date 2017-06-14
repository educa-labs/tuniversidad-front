import React, { Component } from 'react';
import EditIcon from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import UserInfoForm from './UserInfoForm';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }

  render() {
    const { user } = this.props;
    return (
      <div className="general-card">
        <div className="general-card__header">
          <div className="general-card__title">Información General</div>
        </div>
        <div className="general-card__item">
          <div className="value">{`${user.first_name} ${user.last_name}`}</div>
          <div className="label">Nombre</div>
        </div>
        <div className="general-card__item">
          <div className="value">{user.email}</div>
          <div className="label">Correo electrónico</div>
        </div>
        <div className="general-card__item">
          <div className="value">{user.birth_date || 'Sin información'}</div>
          <div className="label">Cumpleaños</div>
        </div>
        <div className="general-card__item">
          <div className="value">{user.phone === '' ? 'Sin número' : `${user.phone.slice(0, 4)} ${user.phone.slice(4)}`}</div>
          <div className="label">Teléfono</div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
