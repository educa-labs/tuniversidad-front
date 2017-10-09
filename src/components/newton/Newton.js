import React, { Component } from 'react';
import PropTypes from 'prop-types';
import is from 'is_js';
import { connect } from 'react-redux';
import { getRecomendations, likeRecomendation } from '../../actions/recomends';
import Loading from '../Loading';
import HelloNewton from './HelloNewton';
import NewtonOne from './NewtonOne';
import NewtonTwo from './NewtonTwo';
import Selections from './Selections';
import DashBoard from './Board';
import './Newton.css';

class Newton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 4,
      showModal: false,
      predictionScore: 'essays',
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
    if (nextProps.recomends !== this.props.recomends) {
      if (is.not.null(nextProps.recomends)) {
        console.log(nextProps.recomends)
        if (nextProps.recomends.length > 0) this.setState({ current: 3 });
        else this.setState({ current: 4 });
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
          />
        );
      case 1:
        return (
          <NewtonOne
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            handleChange={val => this.setState({ predictionScore: val })}
            predictionScore={this.state.predictionScore}
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
          />
        );
      case 3:
        return (
          <Selections
            recomendations={this.props.recomends}
            onAcept={this.onRecomendationAcept}
            onDecline={this.onRecomendationDecline}
            loading={this.props.requesting}
          />
        );
      case 4:
        return (
          <DashBoard
            careers={this.props.careers}
            areas={this.props.areas}
            onSelectArea={selectedArea => this.setState({ selectedArea })}
            selectedArea={this.state.selectedArea}
            handlePredictionScoreChange={val => this.setState({ predictionScore: val })}
            handlePredictionAreaChange={val => this.setState({ predictionArea: val })}
            predictionArea={this.state.predictionArea}
            predictionScore={this.state.predictionScore}
            onRecomend={this.onRecomendClick}
          />
        );
      default: return null;
    }
  }
  onRecomendationAcept(id) {
    this.props.likeRecomendation(this.props.token, id, true);
  }
  
  onRecomendationDecline(id) {
    this.props.likeRecomendation(this.props.token, id, false);
  }

  handleNext() {
    this.setState({ current: this.state.current + 1 });
  }

  handleBack() {
    this.setState({ current: this.state.current - 1 });
  }

  render() {
    return (
      <div className="newton-container">
        {this.props.loading && this.state.current === 4 ? (
          <Loading />
        ) : this.getContent(this.state.current)}
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
  loading: state.recomends.requesting,
  token: state.user.currentUser.auth_token,
  careers: state.search.popular_careers,
  areas: state.fetch.areas,
}), {
  getRecomendations,
  likeRecomendation,
})(Newton);
