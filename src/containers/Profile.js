import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { updateUserInfo } from '../actions/user';
import { removeGoal } from '../actions/goals';
import { getEssays, addEssay, removeEssay } from '../actions/essays';
import { getUserObjectives, updateUserObjectives } from '../actions/objectives';
import { saveUser } from '../helpers/storage';
import ProfileGeneral from '../components/ProfileGeneral';
import ProfileProgress from '../components/ProfileProgress';
import '../styles/Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
    this.handleSlideChange = this.handleSlideChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentWillMount() {
    this.setState({
      missingInfo: this.props.user.nem === null || this.props.user.ranking === null,
      second: false,
    });
  }

  componentDidMount() {
    if (this.props.objectives.objectives === null) this.props.getUserObjectives(this.props.token);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      saveUser(nextProps.user);
    }
    if (this.props.objectives.shouldFetch !== nextProps.objectives.shouldFetch) {
      if (nextProps.objectives.shouldFetch) this.props.getUserObjectives(this.props.token);
    }
  }

  handleSlideChange(value) {
    this.setState({ slideIndex: value });
  }

  updateUser(fields) {
    this.props.updateUserInfo(this.props.user.id, this.props.token, fields);
  }

  render() {
    const { slideIndex } = this.state;
    return (
      <div className="site__children">
        <div className="tabs-container">
          <Tabs
            onChange={this.handleSlideChange}
            value={slideIndex}
            className="tabs tabs_profile"
          >
            <Tab label="General" value={0} />
            <Tab label="Progreso" value={1} />
            <Tab label="Recomendaciones" value={2} />
          </Tabs >
        </div>
        <div className="profile-children">
          {slideIndex === 0 ? (
            <ProfileGeneral
              {...this.props}
              missingInfo={this.state.missingInfo}
              updateUser={this.updateUser}
            />
            ) : null }
          {slideIndex === 1 ? <ProfileProgress {...this.props} /> : null }
          {slideIndex === 2 ? <div>Recomnedaciones</div> : null }
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getEssays: PropTypes.func.isRequired,
  updateUserInfo: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    token: state.user.currentUser.auth_token,
    user: state.user.currentUser,
    objectives: state.objectives,
    essays: {
      1: state.essays[1],
      2: state.essays[2],
      3: state.essays[3],
      4: state.essays[4],
      shouldFetch: state.essays.shouldFetch,
      requesting: state.essays.requesting,
    },
    goals: state.goals.goals,
    subjects: state.fetch.subjects,
  };
}

export default connect(mapStateToProps, {
  removeGoal,
  getUserObjectives,
  getEssays,
  addEssay,
  removeEssay,
  updateUserObjectives,
  updateUserInfo,
})(Profile);
