import React, { Component } from 'react';
import { connect } from 'react-redux';
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
            careers={this.props.careers}
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
          />
        );
      default: return null;
    }
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
        {this.getContent(this.state.current)}
      </div>
    );
  }
}


export default connect(state => ({
  careers: state.search.popular_careers,
  areas: state.fetch.areas,
}))(Newton);
