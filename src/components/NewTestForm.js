import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
  button: {
    margin: '0 5px',
  },
};

class NewTestForm extends Component {
  componentWillMount() {
    this.setState({
      title: null,
      language: null,
      math: null,
      science: null,
      history: null,
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
        label="Agregar"
        onTouchTap={this.props.handleClose}
        style={styles.button}
        secondary
      />,
    ];
    return (
      <Dialog
        title="Agregar un ensayo"
        actions={actions}
        modal
        open={this.props.open}
        className="new-test-form"
        contentStyle={{ width: '32rem' }}
      >
        <div className="new-test-form__field">
          <TextField
            floatingLabelText="Título"
            hintText="Ej: Primer ensayo"
            floatingLabelFixed
            fullWidth
            onChange={(e, val) => this.setState({ title: val })}
          />
        </div>
        <div className="row">
          <div className="new-test-form__field">
            <TextField
              onChange={(e, val) => this.setState({ language: val })}
              floatingLabelText="Lenguaje"
              fullWidth
            />
          </div>
          <div className="new-test-form__field">
            <TextField
              onChange={(e, val) => this.setState({ math: val })}
              floatingLabelText="Matemáticas"
              fullWidth
            />
          </div>
        </div>
        <div className="row">
          <div className="new-test-form__field">
            <TextField
              onChange={(e, val) => this.setState({ science: val })}
              floatingLabelText="Ciencias"
              fullWidth
            />
          </div>
          <div className="new-test-form__field">
            <TextField
              onChange={(e, val) => this.setState({ history: val })}
              floatingLabelText="Historia"
              fullWidth
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

NewTestForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default NewTestForm;
