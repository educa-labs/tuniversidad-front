import React from 'react';
import EditIcon from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';

function UserInfo({ user }) {
  return (
    <div className="general-card">
      <div className="row">
        <div className="general-card__title">Mis Datos</div>
        <div className="general-card__edit-button">
          <IconButton><EditIcon color="#424242" /></IconButton>
        </div>
      </div>
      <br />
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
        <div className="label">Fecha de nacimiento</div>
      </div>
      <div className="general-card__item">
        <div className="value">{user.phone === '' ? 'Sin número' : user.phone}</div>
        <div className="label">Teléfono</div>
      </div>
      <div className="general-card__item">
        <div className="value">{user.preuniversity ? user.preuniversity : 'No'}</div>
        <div className="label">Estoy en un preu</div>
      </div>
    </div>
  );
}

export default UserInfo;
