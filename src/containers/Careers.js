import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MenuBar from '../components/MenuBar';

function Careers(props) {
  return (
    <div>
      <MenuBar />
      Hola amigos
      {props.children}
    </div>
  );
}

export default Careers;
