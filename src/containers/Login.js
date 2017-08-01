import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import is from 'is_js';
import { logUser, clearError } from '../actions/user';
import { saveUser } from '../helpers/storage';
import '../styles/Login.css';

const buttonStyle = {
  margin: '1rem 0',
  fontSize: '14px',
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      save: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (is.not.null(this.props.user)) {
      this.context.router.replace('/site/profile');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      if (is.not.null(nextProps.user)) {
        saveUser(nextProps.user);
        this.context.router.replace('/site/profile');
      }
    }
  }

  componentWillUnmount() {
    this.props.clearError();
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.logUser(email, password);
  }

  render() {
    const { error, requesting } = this.props;
    const { password, email } = this.state;
    return (
      <div className="login-container">
        <div className={`general-card general-card_no-hover ${this.props.mobile ? 'general-card-full-size' : ''}`}>
          <form className={`login-form ${this.props.mobile ? 'login-form-mobile' : ''}`} onSubmit={this.handleSubmit}>
            <div className="logo-tuni logo-tuni-blue logo-tuni-scale" />
            <div className="login-form-title">Acceder</div>
            <TextField
              floatingLabelText="Correo electrónico"
              onChange={(e, val) => this.setState({ email: val })}
              errorText={error.email ? 'No pudimos encontrar tu email' : ''}
              fullWidth
            />
            <TextField
              fullWidth
              floatingLabelText="Contraseña"
              type="password"
              onChange={(e, val) => this.setState({ password: val })}
              errorText={error.password ? 'Contraseña inconrrecta. Inténtalo de nuevo' : ''}
            />
            
            <div className="row">
              <RaisedButton
                type="submit"
                label="Inicia Sesión"
                backgroundColor="#0091EA"
                labelColor="#FFFFFF"
                style={buttonStyle}
                labelStyle={{ fontSize: '14px' }}
                disabled={password === '' || email === '' || requesting}
                fullWidth
              />
            </div>
            <div>¿Nuevo en Tuniversidad? <Link to="/signup" className="forgot">Crea una cuenta.</Link></div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  error: PropTypes.object.isRequired,
  mobile: PropTypes.bool,
  requesting: PropTypes.bool.isRequired,
  logUser: PropTypes.func.isRequired,
};

Login.defaultProps = {
  mobile: false,
};

Login.contextTypes = {
  router: PropTypes.object,
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
  logUser,
  clearError,
})(Login);
