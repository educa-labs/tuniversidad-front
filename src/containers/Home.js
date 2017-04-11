import React, { Component } from 'react';
import Cover from '../components/Cover';
import Register from '../components/Register';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {
  componentWillMount() {
    this.setState({
      compress: false,
    });
  }
  render() {
    return (
      <div>
        <Cover compress={this.state.compress}>
          <RaisedButton
            label="¡Comienza ya!"
            backgroundColor="#0091EA"
            labelColor="#FFFFFF"
          />
        </Cover>
        <Register />
      </div>
    );
  }
}

export default Home;
