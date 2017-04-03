import React, { PropTypes } from 'react';
import Banner from '../components/Banner';
import MenuBar from '../components/MenuBar';

function App(props) {
  return (
    <div className="app">
      <Banner />
      <MenuBar />
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object,
};

export default App;
