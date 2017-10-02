import React, { Component } from 'react';
import is from 'is_js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import UserEssays from './UserEssays';
import UserEssayChart from './UserEssayChart';
import UserEssayForm from './UserEssayForm';
import { getPrediction } from '../helpers/api';


class PropfileProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1,
      openModal: false,
      openEdit: false,
      selected: null,
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  async componentWillMount() {
    const { token } = this.props;
    try {
      const predictions = {
        1: await getPrediction(1, token),
        2: await getPrediction(2, token),
        3: await getPrediction(3, token),
        4: await getPrediction(4, token),
      };
      this.setState({ predictions });
    } catch (err) {
      console.log(err);
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.essays.requesting) {
      if (!nextProps.essays.requesting && this.state.openModal) {
        this.closeModal();
      }
    }
    if (is.not.null(nextProps.essays.shouldFetch)) {
      if (nextProps.essays.shouldFetch !== this.props.essays.shouldFetch) {
        this.props.getEssays(nextProps.token, nextProps.essays.shouldFetch);
        this.props.getGoals(nextProps.token);
        if (nextProps.essays[nextProps.essays.shouldFetch].essays.length > 2) {
          const prediction = await getPrediction(nextProps.essays.shouldFetch, nextProps.token);
          this.setState({
            predictions: Object.assign(this.state.predictions, {
              [nextProps.essays.shouldFetch]: prediction,
            }),
          });
        }
      }
    }
  }


  closeModal() {
    this.setState({ openModal: false });
  }

  handleEdit(selected) {
    this.setState({
      selected,
    });
  }

  render() {
    for (let i = 1; i < 5; i += 1) {
      if (is.null(this.props.essays[i])) return <div>Cargando ... </div>;
    }
    const active = this.props.navigation.essay;
    if (this.props.mobile) {
      return (
        <div className="col">
          <UserEssayForm
            active={active}
            open={this.state.openModal}
            handleClose={this.closeModal}
            subjects={this.props.subjects}
            requesting={this.props.essays.requesting}
            addEssay={(title, subjectId, score, date) => this.props.addEssay(this.props.token, title, subjectId, score, date)}
            mobile
          />
          <UserEssayChart
            essays={this.props.essays}
            subjects={this.props.subjects}
            active={active}
            mobile
          />
          <UserEssays
            mobile
            active={active}
            handleSubjectClick={active => this.props.selectEssay(active)}
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
      <div className="row">
        <UserEssayForm
          active={active}
          open={this.state.openModal}
          handleClose={this.closeModal}
          subjects={this.props.subjects}
          addEssay={(title, subjectId, score, date) => this.props.addEssay(this.props.token, title, subjectId, score, date)}
          requesting={this.props.essays.requesting}
        />
        <div className="col col-3">
          <UserEssayChart
            essays={this.props.essays}
            subjects={this.props.subjects}
            active={active}
          />
        </div>
        <div className="col col-2">
          <UserEssays
            active={active}
            handleSubjectClick={active => this.props.selectEssay(active)}
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

