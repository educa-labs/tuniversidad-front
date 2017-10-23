import React from 'react';
import Modal from './HowItWorks';

const NotImplemented = ({ mobile, toggleModal, showModal }) => (
  <section className={mobile ? 'newton-section-mobile' : 'newton-section'}>
    <div>
      <div className="newton-header">Falta muy poco para que pueda comenzar a recomendar</div>
      <div className="newton-body">
        Soy un motor de inteligencia artificial diseñado para recomendar carreras a aquellos que quieren orientación vocacional.
      </div>
      <div className="how-work" onTouchTap={toggleModal}>¿Cómo funciona?</div>
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

export default NotImplemented;
