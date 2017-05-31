import React, { Component, PropTypes } from 'react';
import Cover from '../components/Cover';
import Register from '../components/Register';
import Login from '../components/Login';
import Banner from '../components/Banner';
import '../styles/Landing.css';

class Landing extends Component {
  componentWillMount() {
    console.log('Hola');
  }
  render() {
    return (
      <div className="landing">
        <Banner location="landing" />
        <Cover />
        <div className="row">
          <div className="col">
            <div className="landing__title">Prepara la PSU como nunca antes.</div>
            <br />
            <div className="landing__body">
              En Tuniversidad podrás encontrar información detallada de universidades y carreras, compararlas y llevar el registro de tu progreso
            </div>
          </div>
          <div className="col">
            <Register />
          </div>
        </div>
        <Login />
      </div>
    );
  }
}

Landing.contextTypes = {
  router: PropTypes.object,
};

export default Landing;
