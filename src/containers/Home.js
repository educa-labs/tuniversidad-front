import React, { Component } from 'react';
import Cover from '../components/Cover';
import Register from '../components/Register';

class Home extends Component {
  componentWillMount() {
    this.setState({
      compress: false,
    });
  }
  render() {
    return (
      <div>
        <Cover compress={this.state.compress} />
        <Register />
      </div>
    );
  }
}

export default Home;
