import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { checkScore } from '../helpers/numeral';

const styles = {
  button: {
    margin: '0 5px',
  },
};

class UserNemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nem: '',
      ranking: '',
      error: '',
    };
    this.disabled = this.disabled.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit() {
    const { nem, ranking } = this.state;
    if (!checkScore(nem) || !checkScore(ranking)) {
      this.setState({ error: 'Puntaje Inválido ' });
    } else {
      this.props.handleSubmit({nem, ranking});
    }
  }
  disabled() {
    const { nem, ranking } = this.state;
    return nem === '' || ranking === '';
  }

  render() {
    const actions = [
      <FlatButton
        label="OK"
        onTouchTap={this.onSubmit}
        style={styles.button}
        labelColor="#0091EA"
        secondary
        disabled={this.disabled()}
      />,
    ];

    return (
      <Dialog
        title="Ingresa tu NEM y Ranking"
        actions={actions}
        open={this.props.open}
        className="form"
        contentStyle={{ width: '25rem' }}
        modal
      >
        Debes ingresar tus notas de enseñanza media y tu ranking, si aún no lo sabes puedes ingresar los puntajes que crees que obtendrás
        <div className="row">
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ nem: val, error: '' })}
              floatingLabelText="Nem"
              fullWidth
              type="number"
              value={this.state.nem}
              errorText={this.state.nem ? this.state.error : ''}
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ ranking: val, error: '' })}
              floatingLabelText="Ranking"
              fullWidth
              type="number"
              value={this.state.ranking}
              errorText={this.state.ranking ? this.state.error : ''}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default UserNemForm;
