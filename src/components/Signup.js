import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import is from 'is_js';
import { signUser } from '../actions/user';
import { saveUser } from '../helpers/storage';

const buttonStyle = {
  margin: '1rem 0',
  fontSize: '14px',
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      confirm_password: '',
      email: '',
      accept: false,
      validPassword: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getError = this.getError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      if (is.not.null(nextProps.user)) {
        this.context.router.push('/');
      }
    }
  }

  getError(type) {
    if (type === 'password') {
      if (!this.state.validPassword) return 'Las contraseñas no coinciden';
      if (is.empty(this.props.error)) return '';
      if (this.props.error.errors.password) return 'Prueba con una contraseña más larga';
    }
    if (type === 'email') {
      if (is.empty(this.props.error)) return '';
      if (this.props.error.errors.email) return 'Alguien ya tomó este correo';
    }
    return '';
  }

  handleSubmit(event) {
    event.preventDefault();
    const { firstName, lastName, password, confirm_password, email } = this.state;
    if (password !== confirm_password) {
      this.setState({ validPassword: false });
    } else {
      this.props.signUser(firstName, lastName, email, password);
    }
  }

  render() {
    const label = <span>Acepto lo términos y condiciones de uso</span>;
    const { firstName, lastName, password, email, accept, confirm_password } = this.state;
    const disabled = is.any.empty(firstName, lastName, password, email, confirm_password) || !accept || this.props.requesting;
    return (
      <div className="login-container" >
        <div className={`general-card general-card_no-hover ${this.props.mobile ? 'general-card-full-size' : ''}`}>
          <form className={`login-form ${this.props.mobile ? 'login-form-mobile' : ''}`} onSubmit={this.handleSubmit}>
            <div className="logo-tuni logo-tuni-blue logo-tuni-scale" />
            <div className="login-form-title">Registro</div>
            <TextField
              floatingLabelText="Nombre"
              fullWidth
              onChange={(e, val) => this.setState({ firstName: val })}
            />
            <TextField
              floatingLabelText="Apellido"
              onChange={(e, val) => this.setState({ lastName: val })}
              fullWidth
            />
            <TextField
              floatingLabelText="Correo electrónico"
              onChange={(e, val) => this.setState({ email: val })}
              errorText={this.getError('email')}
              fullWidth
            />
            <TextField
              type="password"
              fullWidth
              floatingLabelText="Constraseña"
              onChange={(e, val) => this.setState({
                password: val,
                validPassword: true,
              })}
              errorText={this.getError('password')}
            />
            <TextField
              type="password"
              fullWidth
              floatingLabelText="Confirmar constraseña"
              onChange={(e, val) => this.setState({
                confirm_password: val,
                validPassword: true,
              })}
              errorText={this.getError('password')}
            />
            <div className="row align-center">
              <Checkbox
                label={label}
                style={{ transform: 'scale(0.80)' }}
                onCheck={(e, val) => this.setState({ accept: val })}
              />
            </div>
            <div className="row justify-end">
              <RaisedButton
                type="submit"
                label="Registrate"
                backgroundColor="#0091EA"
                labelColor="#FFFFFF"
                fullWidth
                style={buttonStyle}
                labelStyle={{ fontSize: '14px' }}

              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  mobile: PropTypes.bool,
  user: PropTypes.object,
  requesting: PropTypes.bool,
  signUser: PropTypes.func.isRequired,
  error: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
};

Signup.defaultProps = {
  requesting: false,
  mobile: false,
};

Signup.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    error: state.user.error,
    requesting: state.user.requesting,
    user: state.user.currentUser,
  };
}

export default connect(mapStateToProps, {
  signUser,
})(Signup);

