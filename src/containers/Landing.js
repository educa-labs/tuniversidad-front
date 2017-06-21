import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import Cover from '../components/Cover';
import Register from '../components/Register';
import Login from '../components/Login';
import NavigationBar from '../components/NavigationBar';
import '../styles/Landing.css';

class Landing extends Component {
  componentWillMount() {
    if (is.not.null(this.props.user)) this.context.router.replace('/site/profile');
  }
  
  render() {
    return (
      <div className="landing">
        <NavigationBar location="landing" />
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

function mapStateToProps(state) {
  return {
    user: state.user.currentUser,
  };
}

export default connect(mapStateToProps)(Landing);
