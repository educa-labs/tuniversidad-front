import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Modal from './HowItWorks';


const HelloNewton = ({ showModal, toggleModal, handleNext, mobile }) => (
  <section className={mobile ? 'newton-section-mobile' : 'newton-section'}>
    <div>
      <div className="newton-header">¡Bienvenido! Me llamo Newton</div>
      <div className="newton-body">
        Soy un motor de inteligencia artificial diseñado para recomendar carreras a aquellos que quieren orientación vocacional.
      </div>
      <div className="how-work" onTouchTap={toggleModal}>¿Cómo funciona?</div>
      <RaisedButton
        label="Comenzar"
        backgroundColor="#0091EA"
        labelColor="#FFFFFF"
        onTouchTap={handleNext}
      />
    </div>
    <div className="col align-center">
      <div className="newton-welcome" />
    </div>
    <Modal
      isOpen={showModal}
      onRequestClose={toggleModal}
      mobile={mobile}
    />
  </section>
);

HelloNewton.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default HelloNewton;
