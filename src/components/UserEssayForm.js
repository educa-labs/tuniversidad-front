import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectInput from './inputs/SelectInput';

const styles = {
  button: {
    margin: '0 5px',
  },
};

class UserEssayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      score: null,
      subject_id: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { title, score, subject_id } = this.state;
    this.props.addEssay(title, subject_id, score);
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
      />,
    ];
    return (
      <Dialog
        title="Agregar un ensayo"
        actions={actions}
        open={this.props.open}
        className="form"
        contentStyle={{ width: '32rem' }}
        onRequestClose={this.props.handleClose}
      >
        <div className="form__field">
          <TextField
            floatingLabelText="Título"
            hintText="Ej: Primer ensayo"
            floatingLabelFixed
            fullWidth
            onChange={(e, val) => this.setState({ title: val })}
          />
        </div>
        <div className="row">
          <div className="form__field">
            <SelectInput
              title="Asignatura"
              items={this.props.subjects}
              value={this.state.subject_id}
              handleChange={subject_id => this.setState({ subject_id })}
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ score: Number(val) })}
              floatingLabelText="Puntaje"
              type="number"
              fullWidth
            />
          </div>
        </div>
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
