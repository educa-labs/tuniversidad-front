import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MenuBar from '../components/MenuBar';
import Buscador from './Buscador';
import { toggleCompress } from '../actions/view';


const views = {
  1: 'buscar',
  2: 'comparar',
  3: 'recomendacion',
  4: 'noticias',
  5: 'newton',
};

function Home(props) {
  let content;
  switch (views[props.view]) {
    case 'buscar':
      content = (
        <Buscador
          compress={props.compress}
          toggleCompress={props.toggleCompress}
        />);
      break;
    default: break;
  }
  return (
    <div className="home-container">
      <MenuBar />
      {content}
    </div>
  );
}

Home.propTypes = {
  toggleCompress: PropTypes.func.isRequired,
  compress: PropTypes.bool.isRequired,
  view: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    view: state.view.view,
    compress: state.view.compress,
  };
}

export default connect(mapStateToProps, {
  toggleCompress,
})(Home);
