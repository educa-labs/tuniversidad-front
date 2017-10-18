import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const HelloNewton = ({ showModal, toggleModal, handleNext }) => (
  <section className="newton-section">
    <div>
      <div className="title">¡Bienvenido! Me llamo Newton</div>
      <div className="body">
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
    <Dialog
      title="Cómo funciona"
      actions={
        <FlatButton
          label="Ok"
          style={{ color: '#0091EA' }}
          primary
          onClick={toggleModal}
        />
      }
      modal={false}
      open={showModal}
      onRequestClose={toggleModal}
      bodyStyle={{ display: 'flex' }}
    > 
      <div className="col col-2">
        <p>
          Funciona a base de información de estudiantes que rindieron la PSU años pasados (¿cuánto sacaron? ¿A qué postularon? ¿Dónde se matricularon?). Tomando esa información es capaz de comparar los datos con los de prepostulantes actuales, pudiendo con un mínimo de 4 ensayos, predecir el puntaje que podría obtener el usuario. También compara en base al área de preferencia del estudiante y sus puntajes predichos, a qué carreras postularon y entraron perfiles similares al suyo.
        </p>
      </div>
      <div className="col align-center">
        <div className="newton-thinking" />
      </div>
    </Dialog>
  </section>
);

HelloNewton.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default HelloNewton;
