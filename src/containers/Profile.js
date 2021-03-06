import React, { Component, PropTypes } from 'react';
import is from 'is_js';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { selectEssay, selectTab } from '../actions/profile';
import { updateUserInfo } from '../actions/user';
import { removeGoal, getGoals } from '../actions/goals';
import { getEssays, addEssay, removeEssay } from '../actions/essays';
import { getUserObjectives, updateUserObjectives } from '../actions/objectives';
import { getHistory } from '../actions/recomends';
import { saveUser } from '../helpers/storage';
import ProfileGeneral from '../components/ProfileGeneral';
import ProfileProgress from '../components/ProfileProgress';
import Newton from '../components/newton/Newton';
import Loading from '../components/Loading';
import FirstSteps from '../components/tutorial/FirstSteps';
import MobileBanner from './MobileBanner';
import '../styles/Profile.css';
import '../styles/Essay.css';
import '../styles/Form.css';
import '../styles/Tabs.css';

const tabStyle = {
  fontSize: '14px',
  fontWeight: 400,
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
    this.getContent = this.getContent.bind(this);
  }

  componentDidMount() {
    if (is.not.null(this.props.token)) {
      if (is.null(this.props.history)) this.props.getHistory(this.props.token);
      if (is.null(this.props.objectives.objectives) || this.props.objectives.shouldFetch) this.props.getUserObjectives(this.props.token);
      for (let i = 1; i < 5; i += 1) {
        if (is.null(this.props.essays[i])) this.props.getEssays(this.props.token, i);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      saveUser(nextProps.user);
    }
    if (this.props.objectives.shouldFetch !== nextProps.objectives.shouldFetch) {
      console.log(nextProps.objectives.shouldFetch);
      if (nextProps.objectives.shouldFetch) this.props.getUserObjectives(this.props.token);
    }
    if (nextProps.objectives.objectives !== null && this.props.objectives.objectives !== null) {
      if (this.props.objectives.objectives !== nextProps.objectives.objectives) {
        this.props.getGoals(this.props.token);
      }
    }
  }

  updateUser(fields) {
    this.props.updateUserInfo(this.props.user.id, this.props.token, fields);
  }

  getContent(slideIndex) {
    if (!this.props.user.tutorial) return null;
    switch (slideIndex) {
      case 0:
        return (
          <ProfileGeneral
            {...this.props}
            updateUser={this.updateUser}
            handleSlideChange={this.handleSlideChange}
          />
        );
      case 1:
        return <ProfileProgress {...this.props} />;
      case 2:
        return <Newton mobile={this.props.mobile} />;
      default: return null;
    }
  }

  handleSlideChange(value) {
    this.props.selectTab(value);
  }

  render() {
    const { mobile } = this.props;
    if (is.null(this.props.user)) return <Loading />
    return (
      <div className={`page ${mobile ? 'page-mobile' : ''}`}>
        {this.props.user.tutorial ? null : <FirstSteps />}
        {mobile ? <MobileBanner onClick={this.props.toggleMenu} /> : null}
        <Tabs
          onChange={this.handleSlideChange}
          value={this.props.navigation.tab}
          className={`tabs ${mobile ? '' : 'tabs-desk'}`}
        >
          <Tab label="General" value={0} style={tabStyle} />
          <Tab label="Progreso" value={1} style={tabStyle} />
          <Tab
            label={
              <p>Newton {<span style={{ color: '#0091EA' }}>{mobile ? '' : '¡Nuevo!'} </span>}</p>
            }
            value={2}
            style={tabStyle}
          />
        </Tabs>
        {this.getContent(this.props.navigation.tab)}
      </div>
    );
  }
}

Profile.propTypes = {
  getEssays: PropTypes.func.isRequired,
  updateUserInfo: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func,
  objectives: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    token: state.user.currentUser ? state.user.currentUser.auth_token : null,
    user: state.user.currentUser,
    history: state.recomends.history,
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
    navigation: state.profileNavigation,
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
  selectEssay,
  selectTab,
  getHistory,
})(Profile);
