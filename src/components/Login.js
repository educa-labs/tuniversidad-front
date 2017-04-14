import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import is from 'is_js';
import { logUser } from '../actions/user';
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
    this.handleSumbit = this.handleSumbit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      if (is.not.null(nextProps.user.currentUser)) {
        this.props.toggleShowLogin();
      }
    }
  }

  handleSumbit() {
    // Validar los datos,
    const { email, password } = this.state;
    this.props.logUser(email, password);
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
          errorText={this.props.user.error ? 'Usuario no existe' : ''}
        />
        <br />
        <TextField
          hintText="* * * * * *"
          floatingLabelText="Contraseña"
          type="password"
          onChange={(e, val) => this.setState({ password: val })}
          errorText={this.props.user.error ? 'Contraseña inconrrecta' : ''}
        />
        <br />
        <RaisedButton
          label="Inicia Sesión"
          fullWidth
          backgroundColor="#0091EA"
          labelColor="#FFFFFF"
          style={buttonStyle}
          onTouchTap={this.handleSumbit}
          disabled={this.state.password === '' || this.state.email === ''}
        />
        <div className="forgot">¿Olvidaste tu contraseña?</div>
      </Dialog>
    );
  }
}

Login.propTypes = {
  open: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  toggleShowLogin: PropTypes.func.isRequired,
  logUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    open: state.showLogin,
    user: state.user,
  };
}

export default connect(mapStateToProps, {
  toggleShowLogin,
  logUser,
})(Login);
