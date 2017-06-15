import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectInput from './inputs/SelectInput';
import DatePicker from './inputs/DatePicker';
import { checkScore } from '../helpers/numeral';

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
      error: '',
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
    const { title, score, subject_id } = this.state;
    if (!checkScore(score)) {
      this.setState({ error: 'Puntaje Inválido' });
    } else {
      this.props.addEssay(title, subject_id, score);
    }
  }

  disabled() {
    const { title, score, subject_id } = this.state;
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
          onChange={(e, val) => this.setState({ score: Number(val) })}
          floatingLabelText="Puntaje"
          type="number"
          fullWidth
          errorText={this.state.error}
          style={{ width: '5rem' }}
        />
      </div>
    );

    const dateInput = (
      <div className="form__field">
        <DatePicker
          handleChange={val => this.setState({ date: val })}
          date={this.state.birth_date}
        />
      </div>
    );

    return (
      <Dialog
        title="Agregar un ensayo"
        actions={actions}
        open={this.props.open}
        contentContainerClassName="form-container"
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
