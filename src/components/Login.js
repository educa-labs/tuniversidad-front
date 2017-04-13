import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { toggleShowLogin } from '../actions/compress';
import '../styles/Login.css';

const modalStyle = {
  width: '25rem',
};

const buttonStyle = {
  margin: '1rem 0',
};

class Login extends Component {
  componentWillMount() {
    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    return (
      <Dialog
        title="Inicia sesion en Tuniversidad"
        open={this.props.open}
        contentClassName="login-modal"
        titleClassName="login-title"
        onRequestClose={this.props.toggleShowLogin}
        contentStyle={modalStyle}
      >
        <TextField
          hintText="ivan@mail.com"
          floatingLabelText="Correo electrónico"
          onChange={(e, val) => this.setState({ email: val })}
        />
        <br />
        <TextField
          hintText="* * * * * *"
          floatingLabelText="Contraseña"
          type="password"
          onChange={(e, val) => this.setState({ password: val })}
        />
        <br />
        <RaisedButton
          label="Inicia Sesión"
          fullWidth
          backgroundColor="#0091EA"
          labelColor="#FFFFFF"
          style={buttonStyle}
        />
        <div className="forgot">¿Olvidaste tu contraseña?</div>
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
