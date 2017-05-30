import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/image/edit';

const data = {
  language: 700,
  math: 850,
  science: 800,
};

class UserTarget extends Component {
  componentWillMount() {
    this.setState({ editMode: false });
  }

  render() {
    return (
      <div className="general-card">
        <div className="general-card__header">
          <div className="general-card__title">Mi Objetivo</div>
          <div className="general-card__edit-button">
            <IconButton
              tooltip="Editar"
              onTouchTap={() => this.setState({ editMode: true })}
            >
              <EditIcon color="#0091EA" />
            </IconButton>
          </div>
        </div>
        <div className="target">
          <div className="test__item">
            <div className="value">{data.language || '--'}</div>
            <div className="label">Lenguaje</div>
          </div>
          <div className="test__item">
            <div className="value">{data.math || '--'}</div>
            <div className="label">Matemáticas</div>
          </div>
          <div className="test__item">
            <div className="value">{data.science || '--'}</div>
            <div className="label">Ciencias</div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserTarget;

