import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { getGoals } from '../actions/goals';
import '../styles/Profile.css';

class Profile extends Component {
  componentWillMount() {
    this.props.getGoals(this.props.token);
    this.setState({ slideIndex: 0 });
  }

  render() {
    const { slideIndex } = this.state;
    return (
      <div className="site__children">
        <div className="profile-cover">
          <div className="profile-cover__title">Mi Perfil</div>
        </div>
        <div className="tabs-container">
            <Tabs
              onChange={this.handleSlideChange}
              value={slideIndex}
              className="tabs"
            >
              <Tab label="General" value={0} />
              <Tab label="Progreso" value={1} />
              <Tab label="Recomendaciones" value={2} />
            </Tabs >
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
