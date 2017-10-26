import React, { Component } from 'react';
import PropTypes from 'prop-types';
import is from 'is_js';
import { connect } from 'react-redux';
import { getRecomendations, likeRecomendation, changeTab } from '../../actions/recomends';
import Loading from '../Loading';
import HelloNewton from './HelloNewton';
import NewtonOne from './NewtonOne';
import NewtonTwo from './NewtonTwo';
import Selections from './Selections';
import DashBoard from './Board';
import NewtonError from './NewtonError';
import NotImplemented from './NotImplemented';
import './Newton.css';

class Newton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      predictionScore: 'objectives',
      predictionArea: 'manual',
      selectedArea: null,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.onRecomendClick = this.onRecomendClick.bind(this);
    this.onRecomendationAcept = this.onRecomendationAcept.bind(this);
    this.onRecomendationDecline = this.onRecomendationDecline.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.history !== this.props.history) {
      if (is.not.empty(nextProps.history) && is.null(this.props.history)) {
        nextProps.changeTab(5);
      }
    }
    if (nextProps.error !== this.props.error) {
      if (nextProps.error) {
        nextProps.changeTab(4);
      }
    }
    if (nextProps.recomends !== this.props.recomends) {
      if (is.not.null(nextProps.recomends)) {
        if (nextProps.recomends.length > 0) {
          nextProps.changeTab(3);
        } else {
          setTimeout(() => nextProps.changeTab(5), 300);
        }
      }
    }
  }

  onRecomendClick() {
    const { token } = this.props;
    const { predictionScore, predictionArea, selectedArea } = this.state;
    this.props.getRecomendations(token, predictionScore, predictionArea, selectedArea);
  }

  
  getContent(current) {
    switch (current) {
      case 0:
        return (
          <HelloNewton
            showModal={this.state.showModal}
            toggleModal={() => this.setState({ showModal: !this.state.showModal })}
            handleNext={this.handleNext}
            mobile={this.props.mobile}
          />
        );
      case 1:
        return (
          <NewtonOne
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            handleChange={val => this.setState({ predictionScore: val })}
            predictionScore={this.state.predictionScore}
            mobile={this.props.mobile}
            disableEssayOption={this.disableEssayOption()}
          />
        );
      case 2:
        return (
          <NewtonTwo
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            handleChange={val => this.setState({ predictionArea: val })}
            predictionArea={this.state.predictionArea}
            areas={this.props.areas}
            onSelectArea={selectedArea => this.setState({ selectedArea })}
            selectedArea={this.state.selectedArea}
            mobile={this.props.mobile}
            disableGoalOption={this.disableGoalOption()}
            disabled={this.state.predictionArea === 'manual' && this.state.selectedArea === null}
          />
        );
      case 3:
        return (
          <Selections
            recomendations={this.props.recomends}
            onAcept={this.onRecomendationAcept}
            onDecline={this.onRecomendationDecline}
            loading={this.props.requesting}
            mobile={this.props.mobile}
          />
        );
      case 4:
        return (
          <NewtonError
            mobile={this.props.mobile}
            handleNext={this.handleNext}
          />
        );
      case 5:
        return (
          <DashBoard
            history={this.props.history}
            areas={this.props.areas}
            onSelectArea={selectedArea => this.setState({ selectedArea })}
            selectedArea={this.state.selectedArea}
            handlePredictionScoreChange={val => this.setState({ predictionScore: val })}
            handlePredictionAreaChange={val => this.setState({ predictionArea: val })}
            predictionArea={this.state.predictionArea}
            predictionScore={this.state.predictionScore}
            onRecomend={this.onRecomendClick}
            disableEssayOption={this.disableEssayOption()}
            disableGoalOption={this.disableGoalOption()}
            mobile={this.props.mobile}
          />
        );
      default: return null;
    }
  }

  disableEssayOption() {
    let count = 0;
    Object.keys(this.props.essays).forEach((id) => {
      if (is.not.null(this.props.essays[id])) {
        if (this.props.essays[id].essays.length > 2) count += 1;
      }
    });
    return count === 0;
  }

  disableGoalOption() {
    return is.null(this.props.goals) || is.empty(this.props.goals);
  }

  onRecomendationAcept(id) {
    setTimeout(() => {
      this.props.likeRecomendation(this.props.token, id, true);
    }, 300);
  }
  
  onRecomendationDecline(id) {
    setTimeout(() => {
      this.props.likeRecomendation(this.props.token, id, false);
    }, 300);
  }

  handleNext() {
    if (this.props.currentTab === 2) {
      this.onRecomendClick();
    } else if (this.props.currentTab < 5) {
      this.props.changeTab(this.props.currentTab + 1);
    }
  }

  handleBack() {
    this.setState({ current: this.state.current - 1 });
  }


  render() {
    return (
      <div className={this.props.mobile ? 'newton-container-mobile' : 'newton-container'}>
        {this.props.loading && this.props.currentTab !== 3 ? (
          <Loading />
        ) : this.getContent(this.props.currentTab)}
      </div>
    );
  }
}


Newton.propTypes = {
  token: PropTypes.string.isRequired,
  getRecomendations: PropTypes.func.isRequired,
  likeRecomendation: PropTypes.func.isRequired,
};

export default connect(state => ({
  recomends: state.recomends.recomends,
  history: state.recomends.history,
  loading: state.recomends.requesting,
  currentTab: state.recomends.currentTab,
  error: state.recomends.error,
  token: state.user.currentUser.auth_token,
  careers: state.search.popular_careers,
  areas: state.fetch.areas,
  goals: state.goals.goals,
  essays: {
    1: state.essays[1],
    2: state.essays[2],
    3: state.essays[3],
    4: state.essays[4],
  },
}), {
  getRecomendations,
  likeRecomendation,
  changeTab,
})(Newton);
