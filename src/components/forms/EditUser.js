import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import is from 'is_js';
import TextField from 'material-ui/TextField';
import { updateUserInfo } from '../../actions/user';
import NavigationBar from '../../components/NavigationBar';
import DatePicker from '../inputs/DatePicker';
import { validateDate, validatePhone } from '../../helpers/numeral';
import { saveUser } from '../../helpers/storage';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      birth_date: '',
      email: '',
      phone: '',
      error: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      birth_date: this.props.user.birth_date,
      email: this.props.user.email,
      phone: this.props.user.phone,
      error: {},
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      saveUser(nextProps.user);
      this.context.router.replace('/site/profile');
    }
  }

  onSubmit() {
    const { first_name, last_name, birth_date, email, phone } = this.state;
    const error = {};
    if (!validatePhone(this.state.phone)) error.phone = 'Debes ingresar un número válido';
    if (!validateDate(this.state.birth_date)) error.date = 'Esta fecha no existe';
    if (is.not.empty(error)) this.setState({ error });
    else {
      this.props.updateUserInfo(this.props.user.id, this.props.token, {
        first_name,
        last_name,
        birth_date,
        email,
        phone,
      });
    }
  }

  disabled() {
    const { first_name, last_name, email } = this.state;
    return first_name === '' || last_name === '' || email === '';
  }

  render() {
    if (is.null(this.props.user)) return <div>Cargando</div>;
    return (
      <div className="filters-mobile">
        <NavigationBar location="filters" title="Información General" />
        <div className="fields">
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ first_name: val })}
              floatingLabelText="Nombre"
              fullWidth
              value={this.state.first_name}
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ last_name: val })}
              floatingLabelText="Apellido"
              fullWidth
              value={this.state.last_name}
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ email: val })}
              floatingLabelText="Correo electrónico"
              fullWidth
              value={this.state.email}
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ phone: val, error: {} })}
              floatingLabelText="Teléfono"
              hintText="+56961403258"
              fullWidth
              value={this.state.phone}
              errorText={this.state.error.phone || ''}
            />
          </div>
          <div className="col">
            <span className="range-input__title is-margin-left">Cumpleaños</span>
            <div className="form__field form__field-3">
              <DatePicker
                handleChange={val => this.setState({ birth_date: val, error: {} })}
                date={this.state.birth_date}
                errorText={this.state.error.date || ''}
              />
            </div>
          </div>
          <div className="dialog-footer-mobile">
            <FlatButton
              label="Cancelar"
              onTouchTap={this.context.router.goBack}
              secondary
            />
            <FlatButton
              label="OK"
              onTouchTap={this.onSubmit}
              secondary
              disabled={this.disabled()}
            />
          </div>
        </div>
      </div>
    );
  }
}

Form.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.user.currentUser,
    token: state.user.currentUser.auth_token,
  };
}

export default connect(mapStateToProps, {
  updateUserInfo,
})(Form);

