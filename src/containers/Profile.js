import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { removeGoal } from '../actions/goals';
import { getUserObjectives } from '../actions/user';
import ProfileGeneral from '../components/ProfileGeneral';
import ProfileProgress from '../components/ProfileProgress';
import '../styles/Profile.css';

class Profile extends Component {
  componentWillMount() {
    this.setState({ slideIndex: 1 });
    this.handleSlideChange = this.handleSlideChange.bind(this);
    if (this.props.objectives === null) this.props.getUserObjectives(this.props.token);
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


function mapStateToProps(state) {
  return {
    user: state.user.currentUser,
    objectives: state.user.objectives,
    goals: state.goals.goals,
    token: state.user.currentUser.auth_token,
  };
}

export default connect(mapStateToProps, {
  removeGoal,
  getUserObjectives,
})(Profile);
