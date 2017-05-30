import React, { Component } from 'react';
import AddIcon from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import NewTestForm from './NewTestForm';



class UserTest extends Component {
  componentWillMount() {
    this.setState({ editMode: false });
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ editMode: false });
  }

  render() {
    return (
      <div className="general-card">
        <NewTestForm open={this.state.editMode} handleClose={this.closeModal} />
        <div className="general-card__header">
          <div className="general-card__title">Mis Ensayos</div>
          <div className="general-card__edit-button">
            <IconButton
              tooltip="Agrega un ensayo"
              onTouchTap={() => this.setState({ editMode: true })}
            >
              <AddIcon color="#0091EA" />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default UserTest;
