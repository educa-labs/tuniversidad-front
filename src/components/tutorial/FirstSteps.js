import React, { Component } from 'react';
import Slides from './Slides';


class FirstSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      next: 0,
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleBack() {
    const { current, next } = this.state;
    if (current > 0) {
      this.setState({ next: next - 1 });
      setTimeout(() => {
        this.setState({ current: current - 1 });
      }, 300);
    }
  }

  handleNext() {
    const { current, next } = this.state;
    if (current < 2) {
      this.setState({
        current: current + 1,
        next: next + 1,
      });
    }
  }

  render() {
    return (
      <Slides
        current={this.state.current}
        next={this.state.next}
        onBackClick={this.handleBack}
        onNextClick={this.handleNext}
      >
        <p>Primero</p>
        <p>Segundo</p>
        <p>Tercero</p>
      </Slides>
    );
  }
}

export default FirstSteps;
