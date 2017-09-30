import React, { Component } from 'react';
import HelloNewton from './HelloNewton';

class Newton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      showModal: false,
    };
  }

  getContent(current) {
    switch (current) {
      case 0:
        return <HelloNewton />;
      default: return null;
    }
  }

  render() {
    return (
      <div className="newton-container">
        {this.getContent(this.state.current)}
      </div>
    );
  }
}

export default Newton;
