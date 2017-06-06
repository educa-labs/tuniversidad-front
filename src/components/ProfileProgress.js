import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import UserEssays from './UserEssays';
import UserEssayChart from './UserEssayChart';
import UserEssayForm from './UserEssayForm';


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
        <UserEssayForm
          open={this.state.openModal}
          handleClose={this.closeModal}
          subjects={this.props.subjects}
          token={this.props.token}
          addEssay={this.props.addEssay}
        />
        <div className="general">
          <div className="col col-3">
            <UserEssayChart
              essays={this.props.essays}
              subjects={this.props.subjects}
              active={this.state.active}
            />
          </div>
          <div className="col col-2">
            <UserEssays
              active={this.state.active}
              handleSubjectClick={active => this.setState({ active })}
              essays={this.props.essays}
            />
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

