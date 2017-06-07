import React, { Component, PropTypes } from 'react';
import is from 'is_js';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { removeGoal } from '../actions/goals';
import { getEssays, addEssay } from '../actions/essays';
import { getUserObjectives } from '../actions/user';
import ProfileGeneral from '../components/ProfileGeneral';
import ProfileProgress from '../components/ProfileProgress';
import '../styles/Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 1,
    };
  }
  componentDidMount() {
    this.handleSlideChange = this.handleSlideChange.bind(this);
    if (this.props.objectives === null) this.props.getUserObjectives(this.props.token);
    if (is.null(this.props.essays[1])) this.props.getEssays(this.props.token, 1);
    if (is.null(this.props.essays[2])) this.props.getEssays(this.props.token, 2);
    if (is.null(this.props.essays[3])) this.props.getEssays(this.props.token, 3);
    if (is.null(this.props.essays[4])) this.props.getEssays(this.props.token, 4);
  }

  handleSlideChange(value) {
    this.setState({ slideIndex: value });
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
          {slideIndex === 0 ? <ProfileGeneral {...this.props} /> : null }
          {slideIndex === 1 ? <ProfileProgress {...this.props} /> : null }
          {slideIndex === 2 ? <div>Recomnedaciones</div> : null }
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getEssays: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    token: state.user.currentUser.auth_token,
    user: state.user.currentUser,
    objectives: state.user.objectives,
    essays: {
      1: state.essays[1],
      2: state.essays[2],
      3: state.essays[3],
      4: state.essays[4],
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
})(Profile);
