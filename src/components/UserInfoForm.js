import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from './inputs/DatePicker';
import Dialog from './Dialog';

const styles = {
  button: {
    margin: '0 5px',
  },
};

class UserInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      birth_date: this.props.user.birth_date,
      email: this.props.user.email,
      phone: this.props.user.phone,
      error: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.disabled = this.disabled.bind(this);
  }


  onSubmit() {
    if (this.state.phone.length !== 12 && this.state.phone && this.state.phone.slice(0, 4) !== '+569') {
      this.setState({
        errors: Object.assign({}, this.state.errors, {
          phone: 'Número Inválido',
        }),
      });
    } else {
      const fields = _.omit(this.state, ['errors']);
      this.props.updateUser(fields);
    }
  }

  disabled() {
    const { first_name, last_name, email } = this.state;
    return first_name === '' || last_name === '' || email === '';
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancelar"
        onTouchTap={this.props.handleClose}
        secondary
      />,
      <FlatButton
        label="Ok"
        onTouchTap={this.onSubmit}
        style={styles.button}
        secondary
        disabled={this.disabled()}
      />,
    ];
    return (
      <Dialog
        title="Información general"
        open={this.props.open}
        actions={actions}
        contentContainerClassName="form-container"
        onRequestClose={this.props.handleClose}
        className="form"
      >
        <div className="row">
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
        </div>
        <div className="row">
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
              onChange={(e, val) => this.setState({ phone: val })}
              floatingLabelText="Teléfono"
              hintText="+56961403258"
              fullWidth
              value={this.state.phone}
            />
          </div>
        </div>
        <div className="col">
          <span className="range-input__title is-margin-left">Cumpleaños</span>
          <div className="form__field form__field-3">
            <DatePicker
              handleChange={val => this.setState({ birth_date: val })}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

UserInfoForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserInfoForm;
