import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/image/edit';
import UserInfoForm from './UserInfoForm';
import { getDate2 } from '../helpers/strings';
import { saveUser } from '../helpers/storage';

class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({ editMode: false });
      saveUser(nextProps.user);
    } 
  }

  render() {
    const { mobile, user, updateUser } = this.props;
    return (
      <div className={`general-card ${mobile ? '' : 'general-card_desk'}`}>
        <UserInfoForm
          open={this.state.editMode}
          handleClose={() => this.setState({ editMode: false })}
          user={user}
          updateUser={updateUser}
          mobile={mobile}
        />
        <div className="general-card__header">
          <div className="general-card__title">Información General</div>
          <div className="general-card__edit-button">
            <IconButton onTouchTap={() => this.setState({ editMode: true })}>
              <EditIcon color="#969696" />
            </IconButton>
          </div>
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
          <div className="value">{user.birth_date ? getDate2(user.birth_date) : 'Sin información'}</div>
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
