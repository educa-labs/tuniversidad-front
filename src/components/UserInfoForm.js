import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import DatePicker from './inputs/DatePicker';

const styles = {
  button: {
    margin: '0 5px',
  },
};

class UserInfoForm extends Component {
  componentWillMount() {
    this.setState({
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      birth_date: this.props.user.birth_date,
      email: this.props.user.email,
      phone: this.props.user.phone,
      nem: this.props.user.nem,
      ranking: this.props.user.ranking,
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancelar"
        onTouchTap={this.props.handleClose}
        labelColor="#0091EA"
        secondary
      />,
      <FlatButton
        label="Ok"
        onTouchTap={this.props.handleClose}
        style={styles.button}
        secondary
      />,
    ];
    return (
      <Dialog
        title="Información general"
        open={this.props.open}
        actions={actions}
        contentStyle={{ width: '32rem' }}
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
              hintText="56961403258"
              fullWidth
              value={this.state.phone}
            />
          </div>
        </div>
        <div className="row">
          <div className="form__field form__field-2">
            Cumpleaños
          </div>
          <div className="form__field form__field-3">
            <DatePicker handleChange={val => this.setState({ birth_date: val })} />
          </div>
        </div>
        <div className="row">
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ nem: val })}
              floatingLabelText="Nem"
              fullWidth
              type="number"
              value={this.state.nem}
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ ranking: val })}
              floatingLabelText="Ranking"
              fullWidth
              type="number"
              value={this.state.ranking}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

UserInfoForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserInfoForm;
