import React, { Component } from 'react';
import AddIcon from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import NewTestForm from './NewTestForm';

const tests = [
  {
    title: 'Primer ensayo',
    language: 543,
    math: 604,
    history: 620,
  },
  {
    title: 'Segundo ensayo',
    language: 600,
    math: 644,
    science: 590,
    history: 625,
  },
  {
    title: 'Tercera Jornada',
    language: 600,
    math: 644,
    science: 590,
  },
];

class UserTest extends Component {
  componentWillMount() {
    this.setState({ editMode: false });
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ editMode: false });
  }

  renderTest(goal, index) {
    return (
      <div>
        <div className="test" key={index}>
          <div className="test__title">{goal.title}</div>
          <div className="row">
            <div className="test__item">
              <div className="value">{goal.language}</div>
              <div className="label">Lenguaje</div>
            </div>
            <div className="test__item">
              <div className="value">{goal.math}</div>
              <div className="label">Matemáticas</div>
            </div>
            <div className="test__item">
              <div className="value">{goal.science || '--'}</div>
              <div className="label">Ciencias</div>
            </div>
            <div className="test__item">
              <div className="value">{goal.history || '--'}</div>
              <div className="label">Histotria</div>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    );
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
        {tests.map((test, index) => this.renderTest(test, index))}
      </div>
    );
  }
}

export default UserTest;
