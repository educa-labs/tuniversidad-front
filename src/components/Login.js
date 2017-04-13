import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { toggleShowLogin } from '../actions/compress';

class Login extends Component {
  render() {
    return (
      <Dialog
        title="Hola"
        open={this.props.open}
        contentClassName="login-modal"
        titleClassName="login-title"
        onRequestClose={this.props.toggleShowLogin}
      >
        Hola amigos somos el login
      </Dialog>
    );
  }
}

Login.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleShowLogin: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    open: state.showLogin,
  };
}

export default connect(mapStateToProps, {
  toggleShowLogin,
})(Login);
