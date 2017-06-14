import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { checkScore } from '../helpers/numeral';

class UserObjectivesForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: this.props.objectives.language,
      math: this.props.objectives.math,
      science: this.props.objectives.science,
      history: this.props.objectives.history,
      error: '',
    };
    this.disabled = this.disabled.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { language, math, science, history } = this.state;
    if (!checkScore(language) || !checkScore(math) || (!checkScore(science) && science) || (!checkScore(history) && history)) {
      this.setState({ error: 'Puntaje Inválido' });
    } else {
      this.props.handleSubmit(language, math, history, science);
    }
  }

  disabled() {
    const { language, math, science, history } = this.state;
    return language === '' || math === '';
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
        label="OK"
        onTouchTap={this.onSubmit}
        secondary
        disabled={this.disabled()}

      />,
    ];
    return (
      <Dialog
        title="Mi Objetivo"
        actions={actions}
        open={this.props.open}
        contentContainerClassName="form-container"
        onRequestClose={this.props.handleClose}
      >
        <div className="row">
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ language: Number(val), error: '' })}
              value={this.state.language}
              floatingLabelText="Lenguaje"
              fullWidth
              type="number"
              errorText={this.state.language ? this.state.error : ''}
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ math: Number(val), error: '' })}
              value={this.state.math}
              floatingLabelText="Matemáticas"
              fullWidth
              type="number"
              errorText={this.state.math ? this.state.error : ''}
            />
          </div>
        </div>
        <div className="row">
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ history: Number(val), error: '' })}
              value={this.state.history}
              floatingLabelText="Historia"
              fullWidth
              type="number"
              errorText={this.state.history ? this.state.error : ''}
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ science: Number(val), error: '' })}
              value={this.state.science}
              floatingLabelText="Ciencias"
              fullWidth
              type="number"
              errorText={this.state.science ? this.state.error : ''}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default UserObjectivesForm;
