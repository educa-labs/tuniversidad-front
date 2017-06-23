import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import is from 'is_js';
import ContentAdd from 'material-ui/svg-icons/content/add';
import UserEssays from './UserEssays';
import UserEssayChart from './UserEssayChart';
import UserEssayForm from './UserEssayForm';


class PropfileProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1,
      openModal: false,
    };
  }

  componentDidMount() {
    for (let i = 1; i < 5; i += 1) {
      if (is.null(this.props.essays[i])) this.props.getEssays(this.props.token, i);
    }
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.essays.requesting) {
      if (!nextProps.essays.requesting && this.state.openModal) {
        this.closeModal();
      }
    }

    if (is.not.null(nextProps.essays.shouldFetch)) {
      if (nextProps.essays.shouldFetch !== this.props.essays.shouldFetch) {
        this.props.getEssays(nextProps.token, nextProps.essays.shouldFetch);
      }
    }
  }


  closeModal() {
    this.setState({ openModal: false });
  }

  render() {
    for (let i = 1; i < 5; i += 1) {
      if (is.null(this.props.essays[i])) return <div>Cargando ... </div>;
    }
    if (this.props.mobile) {
      return (
        <div className="col col-grey">
          <UserEssayForm
            active={this.state.active}
            open={this.state.openModal}
            handleClose={this.closeModal}
            subjects={this.props.subjects}
            token={this.props.token}
            addEssay={(title, subjectId, score) => this.props.addEssay(this.props.token, title, subjectId, score)}
            mobile
          />
          <UserEssayChart
            essays={this.props.essays}
            subjects={this.props.subjects}
            active={this.state.active}
            mobile
          />
          <UserEssays
            mobile
            active={this.state.active}
            handleSubjectClick={active => this.setState({ active })}
            essays={this.props.essays}
            removeEssay={(essayId, subjectId) => this.props.removeEssay(this.props.token, essayId, subjectId)}
          />
          <div className="action-button">
            <FloatingActionButton secondary onTouchTap={() => this.setState({ openModal: true })}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
      );
    }
    return (
      <div className="col col-row col-grey-desk">
        <UserEssayForm
          active={this.state.active}
          open={this.state.openModal}
          handleClose={this.closeModal}
          subjects={this.props.subjects}
          token={this.props.token}
          addEssay={(title, subjectId, score) => this.props.addEssay(this.props.token, title, subjectId, score)}
        />
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
            removeEssay={(essayId, subjectId) => this.props.removeEssay(this.props.token, essayId, subjectId)}
          />
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

