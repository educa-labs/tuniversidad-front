import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Eye from 'material-ui/svg-icons/action/visibility';
import NoEye from 'material-ui/svg-icons/action/visibility-off';
import TextField from 'material-ui/TextField';
import is from 'is_js';
import '../styles/Register.css';
import { signUser } from '../actions/user';

const styles = {
  margin: '0 10px',
};

class Register extends Component {
  componentWillMount() {
    this.setState({
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      accept: false,
      showTerms: false,
      showPass: false,
    });
    this.toggleAccept = this.toggleAccept.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleAccept() {
    this.setState({ accept: !this.state.accept });
  }

  handleSubmit() {
    const { firstName, lastName, password, email } = this.state;
    this.props.signUser(firstName, lastName, email, password);
  }

  render() {
    const { firstName, lastName, password, email, accept, showPass } = this.state;
    const { error, requesting } = this.props;
    const disabled = is.any.empty(firstName, lastName, password, email) || !accept || requesting;
    return (
      <div className="register-form" >
        <div className="row">
          <div className="item">
            <TextField
              hintText="Emilio"
              floatingLabelFixed
              floatingLabelText="Nombre"
              fullWidth
              onChange={(e, val) => this.setState({ firstName: val })}
              style={styles}
            />
          </div>
          <div className="item">
            <TextField
              hintText="Villagran"
              floatingLabelFixed
              floatingLabelText="Apellido"
              onChange={(e, val) => this.setState({ lastName: val })}
              style={styles}
            />
          </div>
        </div>
        <div className="row">
          <div className="item ">
            <TextField
              hintText="emilio@educalabs.cl"
              floatingLabelFixed
              floatingLabelText="Correo electrónico"
              onChange={(e, val) => this.setState({ email: val })}
              errorText={error.email ? `Email ${error.email[0]}` : ''}
              style={styles}
            />
          </div>
          <div className="item password">
            <TextField
              type={`${showPass ? '' : 'password'}`}
              hintText="* * * * * *"
              floatingLabelFixed
              fullWidth
              floatingLabelText="Constraseña"
              onChange={(e, val) => this.setState({ password: val })}
              errorText={error.password ? `Password ${error.password[0]}` : ''}
              style={styles}
            />
            <IconButton onTouchTap={() => this.setState({ showPass: !showPass })} >
              {showPass ? <NoEye color="#E5E5E5" /> : <Eye color="#E5E5E5" />}
            </IconButton >
          </div>
        </div>
        <div className="terms">
          <input id="terms" type="checkbox" checked={accept} onClick={this.toggleAccept} />
          <label htmlFor="terms">Acepto los</label>
          <span onClick={() => this.setState({ showTerms: true })}> términos y condiciones de uso</span>
        </div>
        <RaisedButton
          label="Registrate"
          backgroundColor="#0091EA"
          labelColor="#FFFFFF"
          fullWidth
          disabled={disabled}
          onTouchTap={this.handleSubmit}
        />
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

