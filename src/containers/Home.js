import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Cover from '../components/Cover';
import Register from '../components/Register';
import Login from '../components/Login';
import '../styles/Home.css';

class Home extends Component {
  componentWillMount() {
    this.setState({
      compress: false,
    });
  }
  render() {
    return (
      <div className="home-container">
        <Cover compress={this.state.compress}>
          <RaisedButton
            label="¡Comienza ya!"
            backgroundColor="#0091EA"
            labelColor="#FFFFFF"
          />
        </Cover>
        <div className="row">
          <div className="info">
            <div className="title">Prepara la PSU como nunca antes.</div>
            <br />
            <div className="body">
              En Tuniversidad podrás encontrar información detallada de universidades y carreras, compararlas y llevar el registro de tu progreso
            </div>
          </div>
          <Register />
        </div>
        <Login />
      </div>
    );
  }
}

export default Home;
