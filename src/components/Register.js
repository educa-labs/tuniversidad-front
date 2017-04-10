import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import '../styles/Register.css';

class Register extends Component {
  componentWillMount() {
    this.setState({
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      accept: false,
      showTerms: false,
    });
    this.toggleAccept = this.toggleAccept.bind(this);
  }

  toggleAccept() {
    this.setState({ accept: !this.state.accept });
  }

  render() {
    const { firstName, lastName, password, email, accept } = this.state;
    return (
      <div className="register-form" >
        <div className="fields">
          <input
            value={firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
            placeholder="Nombre"
          />
          <input
            value={lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
            placeholder="Apellido"
          />
          <input
            type="email"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="Correo electrónico"
          />
          <input
            type="password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="Contraseña"
          />
        </div>
        <div className="terms">
          <input id="terms" type="checkbox" checked={accept} onClick={this.toggleAccept} />
          <label htmlFor="terms">Acepto los</label>
          <span onClick={() => this.setState({ showTerms: true })}> términos y condiciones de uso</span>
        </div>
        <div className="button">
          Regístrate
        </div>
      </div>
    );
  }
}

export default Register;

