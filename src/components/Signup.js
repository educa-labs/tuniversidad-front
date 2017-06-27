import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import Eye from 'material-ui/svg-icons/action/visibility';
import NoEye from 'material-ui/svg-icons/action/visibility-off';
import TextField from 'material-ui/TextField';
import is from 'is_js';
import '../styles/Register.css';
import { signUser } from '../actions/user';

const buttonStyle = {
  margin: '1rem 0',
  fontSize: '14px',
};

class Register extends Component {
  componentWillMount() {
    this.setState({
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      accept: false,
    });
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { firstName, lastName, password, email } = this.state;
    this.props.signUser(firstName, lastName, email, password);
  }

  render() {
    const label = <span>Acepto lo términos y condiciones de uso</span>;
    const { firstName, lastName, password, email, accept, showPass } = this.state;
    const { error, requesting } = this.props;
    const disabled = is.any.empty(firstName, lastName, password, email) || !accept || requesting;
    return (
      <div className="login-container" >
        <div className={`general-card general-card_no-hover ${this.props.mobile ? 'general-card-full-size' : ''}`}>
          <form className={`login-form ${this.props.mobile ? 'login-form-mobile' : ''}`} onSubmit={this.handleSumbit}>
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
              errorText={error.email ? `Email ${error.email[0]}` : ''}
              fullWidth
            />
            <TextField
              type="password"
              fullWidth
              floatingLabelText="Constraseña"
              onChange={(e, val) => this.setState({ password: val })}
              errorText={error.password ? `Password ${error.password[0]}` : ''}
            />
            <TextField
              type="password"
              fullWidth
              floatingLabelText="Confirmar constraseña"
              onChange={(e, val) => this.setState({ confirm_password: val })}
              errorText={error.password ? `Password ${error.password[0]}` : ''}
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
                disabled={disabled}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  requesting: PropTypes.bool,
  signUser: PropTypes.func.isRequired,
  error: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
};

Register.defaultProps = {
  requesting: false,
};

function mapStateToProps(state) {
  return {
    error: state.user.error,
    requesting: state.user.requesting,
  };
}

export default connect(mapStateToProps, {
  signUser,
})(Register);

