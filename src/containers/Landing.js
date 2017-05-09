import React, { Component } from 'react';
import Cover from '../components/Cover';
import Register from '../components/Register';
import Login from '../components/Login';
import Banner from '../components/Banner';
import '../styles/Landing.css';

class Landing extends Component {
  componentWillMount() {
    this.setState({
      compress: false,
    });
  }
  render() {
    return (
      <div className="landing-container">
        <Banner location="landing" />
        <Cover />
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

export default Landing;
