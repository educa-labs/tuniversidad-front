import React, { PropTypes, Component } from 'react';
import is from 'is_js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectInput from './inputs/SelectInput';
import DatePicker from './inputs/DatePicker';
import { checkScore, validateDate } from '../helpers/numeral';

const styles = {
  button: {
    margin: '0 5px',
  },
};

class UserEssayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      score: '',
      subject_id: this.props.active,
      error: {},
      date: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.disabled = this.disabled.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      this.setState({ subject_id: nextProps.active});
    }
  }

  onSubmit() {
    const { title, score, subject_id, date } = this.state;
    const error = {};
    if (!checkScore(score)) error.score = 'Puntaje Inválido';
    if (!validateDate(date)) error.date = 'Esta fecha no existe';
    if (is.not.empty(error)) {
      this.setState({ error });
      return;
    }

    this.props.addEssay(title, subject_id, score, date);
    
  }

  disabled() {
    const { title, score, subject_id, date } = this.state;
    if (!this.state.date) return true;
      for (const s of this.state.date.split('-')) {
        if (s === 'null') return true;
      }
    return title === '' || score === '' || subject_id === '';
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancelar"
        onTouchTap={this.props.handleClose}
        style={styles.button}
        secondary
      />,
      <FlatButton
        label="OK"
        onTouchTap={this.onSubmit}
        style={styles.button}
        secondary
        disabled={this.disabled()}
      />,
    ];

    const titleInput = (
      <div className="form__field">
        <TextField
          floatingLabelText="Título"
          hintText="Ej: Primer ensayo"
          floatingLabelFixed
          fullWidth
          onChange={(e, val) => this.setState({ title: val })}
        />
      </div>
    );

    const subjectInput = (
      <div className="form__field">
        <SelectInput
          title="Asignatura"
          items={this.props.subjects}
          value={this.state.subject_id}
          handleChange={subject_id => this.setState({ subject_id })}
        />
      </div>
    );

    const scoreInput = (
      <div className="form__field">
        <TextField
          onChange={(e, val) => this.setState({
            score: Number(val),
            error: Object.assign({}, this.state.error, {
              score: '',
            }),
          })}
          floatingLabelText="Puntaje"
          type="number"
          fullWidth
          errorText={this.state.error ? this.state.error.score : ''}
        />
      </div>
    );

    const dateInput = (
      <div className="form__field">
        <DatePicker
          handleChange={val => this.setState({ date: val })}
          date={this.state.date}
          errorText={this.state.error ? this.state.error.date : ''}
          year={2017}
        />
      </div>
    );

    return (
      <Dialog
        title="Agregar un ensayo"
        actions={actions}
        open={this.props.open}
        contentClassName="form-container"
        onRequestClose={this.props.handleClose}
      >
        {this.props.mobile ? (
          <div className="col">
            {titleInput}
            {subjectInput}
            {dateInput}
            {scoreInput}
          </div>
        ) : (
          <div>
            {titleInput}
            {dateInput}
            <div className="row">
              {subjectInput}
              {scoreInput}
            </div>
          </div>
        )}
        
        
      </Dialog>
    );
  }
}

UserEssayForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  addEssay: PropTypes.func.isRequired,
};

export default UserEssayForm;
