import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const Modal = ({ onClose, isOpen, onRequestClose }) => (
  <Dialog
    open={isOpen}
    title="Cómo funciona"
    onRequestClose={onRequestClose}
    contentClassName="newton-modal"
    actions={[
      <FlatButton
        label="Ok"
        onClick={onRequestClose}
        labelStyle={{ color: '#0091EA' }}
      />,
    ]}
  >
    Para buscar una carrera necesitamos un puntaje. Si quieres que usemos tus ensayos como parámetro debes tener agregado al menos <span>tres</span> ensayos en la asignatura. Si tienes menos de 3 ensayos consideraremos el puntaje que tienes como objetivo en esa asignatura. <br />
    Tambíen necesitamos que eligas un área de estudio, esta la puedes elegir manualmente o la podemos elegir a partir de las carreras que tienes como metas.
  </Dialog>
);

export default Modal;
