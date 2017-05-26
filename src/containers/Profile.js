import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { getGoals } from '../actions/goals';
import ProfileGeneral from '../components/ProfileGeneral';
import '../styles/Profile.css';

class Profile extends Component {
  componentWillMount() {
    this.setState({ slideIndex: 0 });
    this.handleSlideChange = this.handleSlideChange.bind(this);
  }

  handleSlideChange(value) {
    this.setState({ slideIndex: value });
  }

  render() {
    const { slideIndex } = this.state;
    return (
      <div className="site__children">
        {/*<div className="profile-cover">
          <div className="profile-cover__title">Mi Perfil</div>
        </div>*/}
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
          {slideIndex === 0 ? <ProfileGeneral user={this.props.user} /> : null }
          {slideIndex === 1 ? <div>Progreso</div> : null }
          {slideIndex === 2 ? <div>Recomnedaciones</div> : null }
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getGoals: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user.currentUser,
    token: state.user.currentUser.auth_token,
  };
}

export default connect(mapStateToProps, {
  getGoals,
})(Profile);
