import React from 'react';
import Banner from '../components/Banner';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Banner location={this.props.location.pathname} />
        {this.props.children}
      </div>
    );
  }
}

export default App;
