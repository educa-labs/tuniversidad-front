import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import is from 'is_js';
import TextField from 'material-ui/TextField';
import { checkScore } from '../helpers/numeral';
import Dialog from './Dialog';

class UserObjectivesForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: this.props.objectives.language,
      math: this.props.objectives.math,
      science: this.props.objectives.science,
      history: this.props.objectives.history,
      nem: this.props.user.nem,
      ranking: this.props.user.ranking,
      error: {},
    };
    this.disabled = this.disabled.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getError = this.getError.bind(this);
    this.logChage = this.logChage.bind(this);
  }

  getError(field) {
    return this.state.error[field] ? this.state.error[field] : '';
  }

  logChage(field, val) {
    this.setState({
      [field]: val ? Number(val) : '',
      error: Object.assign({}, this.state.error, {
        [field]: '',
      }),
    });
  }

  onSubmit() {
    const { language, math, science, history, nem, ranking } = this.state;
    const fields = [
      'language',
      'math',
      'science',
      'history',
      'nem',
      'ranking',
    ];
    const error = {};
    const errMsg = 'Puntaje Inválido';
    fields.forEach((fld) => {
      if (!checkScore(this.state[fld] && this.state[fld])) {
        error[fld] = errMsg;
      }
    });
    if (is.not.empty(error)) this.setState({ error });
    else {
      this.props.handleSubmit(language, math, history, science);
      this.props.updateUser({
        nem,
        ranking,
      });
    }
  }

  disabled() {
    const { language, math, nem, ranking } = this.state;
    return language === '' || math === '' || nem === '' || ranking === '';
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancelar"
        onTouchTap={this.props.handleClose}
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
              onChange={(e, val) => this.logChage('language', val)}
              value={this.state.language}
              floatingLabelText="Lenguaje"
              fullWidth
              type="number"
              errorText={this.getError('language')}
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ math: Number(val), error: '' })}
              value={this.state.math}
              floatingLabelText="Matemáticas"
              fullWidth
              type="number"
              errorText={this.getError('math')}
            />
          </div>
        </div>
        <div className="row">
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.logChage('history', val)}
              value={this.state.history}
              floatingLabelText="Historia"
              fullWidth
              type="number"
              errorText={this.getError('history')}
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.logChage('science', val)}
              value={this.state.science}
              floatingLabelText="Ciencias"
              fullWidth
              type="number"
              errorText={this.getError('science')}
            />
          </div>
        </div>
        <div className="row">
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.logChage('nem', val)}
              floatingLabelText="Nem"
              fullWidth
              type="number"
              value={this.state.nem}
              errorText={this.getError('nem')}
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.logChage('ranking', val)}
              floatingLabelText="Ranking"
              fullWidth
              type="number"
              value={this.state.ranking}
              errorText={this.getError('ranking')}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default UserObjectivesForm;
