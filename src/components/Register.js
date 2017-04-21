import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Eye from 'material-ui/svg-icons/action/visibility';
import NoEye from 'material-ui/svg-icons/action/visibility-off';
import is from 'is_js';
import '../styles/Register.css';
import { signUser } from '../actions/user';

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
    console.log('click');
    const { firstName, lastName, password, email } = this.state;
    signUser(firstName, lastName, email, password);
  }

  render() {
    const { firstName, lastName, password, email, accept, showPass } = this.state;
    const disabled = is.any.empty(firstName, lastName, password, email) || !accept;
    return (
      <div className="register-form" >
        <div className="row">
          <div className="item">
            <input
              value={firstName}
              onChange={e => this.setState({ firstName: e.target.value })}
              placeholder="Nombre"
            />
          </div>
          <div className="item">
            <input
              value={lastName}
              onChange={e => this.setState({ lastName: e.target.value })}
              placeholder="Apellido"
            />
          </div>
        </div>
        <div className="row">
          <div className="item ">
            <input
              type="email"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              placeholder="Correo electrónico"
            />
          </div>
          <div className="item password">
            <input
              type={`${showPass ? '' : 'password'}`}
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="Contraseña"
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

export default connect(null, {
  signUser,
})(Register);

