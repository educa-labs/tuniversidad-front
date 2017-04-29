import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import is from 'is_js';
import { logUser, clearState } from '../actions/user';
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
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      if (is.not.null(nextProps.user.currentUser)) {
        this.props.toggleShowLogin();
        console.log(nextProps.user);
      }
    }
  }
  handleModalClose() {
    if (this.props.open) {
      if (is.not.empty(this.props.error)) {
        this.props.clearState();
      }
    }
    this.props.toggleShowLogin();
  }

  handleSumbit(event) {
    // Validar los datos,
    event.preventDefault();
    const { email, password } = this.state;
    this.props.logUser(email, password);
  }

  render() {
    const { error, requesting, open } = this.props;
    const { password, email } = this.state;
    return (
      <Dialog
        title="Inicia sesion en Tuniversidad"
        open={open}
        contentClassName="login-modal"
        titleClassName="login-title"
        onRequestClose={this.handleModalClose}
        contentStyle={modalStyle}
      >
        <form onSubmit={this.handleSumbit}>
          <TextField
            hintText="ivan@mail.com"
            floatingLabelText="Correo electrónico"
            onChange={(e, val) => this.setState({ email: val })}
            errorText={is.not.empty(error) ? 'Usuario no existe' : ''}
          />
          <br />
          <TextField
            hintText="* * * * * *"
            floatingLabelText="Contraseña"
            type="password"
            onChange={(e, val) => this.setState({ password: val })}
            errorText={is.not.empty(error) ? 'Contraseña inconrrecta' : ''}
          />
          <br />
          <RaisedButton
            type="submit"
            label="Inicia Sesión"
            fullWidth
            backgroundColor="#0091EA"
            labelColor="#FFFFFF"
            style={buttonStyle}
            disabled={password === '' || email === '' || requesting}
          />
          <div className="forgot">¿Olvidaste tu contraseña?</div>
        </form>
      </Dialog>
    );
  }
}

Login.propTypes = {
  open: PropTypes.bool.isRequired,
  user: PropTypes.object,
  error: PropTypes.object.isRequired,
  requesting: PropTypes.bool.isRequired,
  toggleShowLogin: PropTypes.func.isRequired,
  logUser: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    open: state.showLogin,
    user: state.user.currentUser,
    error: state.user.error,
    requesting: state.user.requesting,
  };
}

export default connect(mapStateToProps, {
  toggleShowLogin,
  logUser,
  clearState,
})(Login);
