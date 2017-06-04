import React, { Component } from 'react';
import AddIcon from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import UserTestForm from './UserTestForm';
import Essay from './Essay';

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

function renderTest(goal, index) {
  return (
    <div key={index}>
      <div className="test" >
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

class UserEssays extends Component {
  componentWillMount() {
    this.setState({ active: null });
    this.handleSubjectClick = this.handleSubjectClick.bind(this);
  }

  handleSubjectClick(value) {
    this.setState({ active: value });
  }

  render() {
    return (
      <div className="general-card">
        <UserTestForm open={this.state.editMode} handleClose={this.closeModal} />
        <div className="general-card__header">
          <div className="general-card__title">Mis Ensayos</div>
        </div>
        <Essay
          title="Lenguaje"
          active={this.state.active === 1}
          handleClick={() => this.handleSubjectClick(1)}
        />
        <Essay
          title="Matemáticas"
          active={this.state.active === 2}
          handleClick={() => this.handleSubjectClick(2)}
        />
        <Essay
          title="Ciencias Naturales"
          active={this.state.active === 4}
          handleClick={() => this.handleSubjectClick(4)}
        />
        <Essay
          title="Historia"
          active={this.state.active === 3}
          handleClick={() => this.handleSubjectClick(3)}
        />
      </div>
    );
  }
}

export default UserEssays;
