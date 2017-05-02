import { PropTypes } from 'react';

function App(props) {
  return props.children;
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
