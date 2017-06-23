import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { updateUserInfo } from '../actions/user';
import { removeGoal, getGoals } from '../actions/goals';
import { getEssays, addEssay, removeEssay } from '../actions/essays';
import { getUserObjectives, updateUserObjectives } from '../actions/objectives';
import { saveUser } from '../helpers/storage';
import ProfileGeneral from '../components/ProfileGeneral';
import ProfileProgress from '../components/ProfileProgress';
import FirstSteps from '../components/FirstSteps';
import MobileBanner from './MobileBanner';
import '../styles/Profile.css';
import '../styles/Essay.css';
import '../styles/Form.css';
import '../styles/Tabs.css';

const tabStyle = {
  fontSize: '14px',
  width: '33%',
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
    this.handleSlideChange = this.handleSlideChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.props.getUserObjectives(this.props.token);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      saveUser(nextProps.user);
    }
    if (this.props.objectives.shouldFetch !== nextProps.objectives.shouldFetch) {
      if (nextProps.objectives.shouldFetch) this.props.getUserObjectives(this.props.token);
    }
    if (this.props.objectives.objectives !== nextProps.objectives.objectives) {
      this.props.getGoals(this.props.token);
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
    const { mobile } = this.props;
    return (
      <div className="col">
        <FirstSteps
          open={!this.props.user.tutorial}
          token={this.props.token}
          regions={this.props.regions}
          updateUserInfo={this.props.updateUserInfo}
          updateUserObjectives={this.props.updateUserObjectives}
          user={this.props.user}
        />
        {mobile ? <MobileBanner onClick={this.props.toggleMenu} /> : null}
          <Tabs
            onChange={this.handleSlideChange}
            value={slideIndex}
            className={`tabs ${mobile ? '' : 'tabs-desk'}`}
          >
            <Tab label="General" value={0} style={tabStyle} />
            <Tab label="Progreso" value={1} style={tabStyle} />
            <Tab label="Sugerencias" value={2} style={tabStyle} />
          </Tabs >
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
    );
  }
}

Profile.propTypes = {
  getEssays: PropTypes.func.isRequired,
  updateUserInfo: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func,
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
    regions: state.fetch.regions,
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
  getGoals,
})(Profile);
