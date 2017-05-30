import React from 'react';
import EditIcon from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

function UserInfo({ user }) {
  return (
    <div className="general-card">
      <div className="general-card__header">
        <div className="general-card__title">Información General</div>
        <div className="general-card__edit-button">
          <IconButton><EditIcon color="#0091EA" /></IconButton>
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
      <Divider />
      <div className="general-card__footer">
        <div className="general-card__footer_item">
          <div className="value">{user.nem || 720}</div>
          <div className="label">NEM</div>
        </div>
        <div className="general-card__footer_item">
          <div className="value">{user.ranking || 850}</div>
          <div className="label">Ranking</div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
