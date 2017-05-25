import React, { PropTypes, Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import '../styles/Profile.css';

class Profile extends Component {
  componentWillMount() {
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

export default Profile;
