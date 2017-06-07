import React, { Component } from 'react';
import EditIcon from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import UserInfoForm from './UserInfoForm';

class UserInfo extends Component {
  componentWillMount() {
    this.setState({ editMode: false });
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ editMode: false });
  }

  render() {
    const { user } = this.props;
    return (
      <div className="general-card">
        <UserInfoForm
          user={user}
          open={this.state.editMode}
          handleClose={this.closeModal}
          updateUserInfo={fields => this.props.updateUserInfo(this.props.user.id, this.props.token, fields)}
        />
        <div className="general-card__header">
          <div className="general-card__title">Información General</div>
          <div className="general-card__edit-button">
            <IconButton
              tooltip="Editar"
              onTouchTap={() => this.setState({ editMode: true })}
            >
              <EditIcon color="#0091EA" />
            </IconButton>
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
          <div className="label">Cumpleaños</div>
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
}

export default UserInfo;
