import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import UserEssays from './UserEssays';
import UserEssayChart from './UserEssayChart';
import UserEssayForm from './UserEssayForm';

const essays = [
  { title: 'Primer ensayo', score: 678, date: '17-05-2017' },
  { title: 'Primer ensayo preu', score: 578, date: '17-06-2017' },
  { title: 'Segundo', score: 750, date: '12-07-2017' },
  { title: 'Tercero ensayo', score: 678, date: '22-08-2017' },
  { title: 'Jornada', score: 450, date: '19-09-2017' },
];

class PropfileProgress extends Component {
  componentWillMount() {
    this.setState({
      active: 1,
      openModal: false,
    });
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  render() {
    return (
      <div className="progress">
        <UserEssayForm open={this.state.openModal} handleClose={this.closeModal} />
        <div className="general">
          <div className="col col-3">
            <UserEssayChart data={essays} active={this.state.active} />
          </div>
          <div className="col col-2">
            <UserEssays active={this.state.active} handleSubjectClick={active => this.setState({ active })} />
          </div>
        </div>
        <div className="action-button">
          <FloatingActionButton secondary onTouchTap={() => this.setState({ openModal: true })}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    );
  }
}

export default PropfileProgress;

