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
            onChange={(e, val) => this.setState({ title: Number(val) })}
          />
        </div>
        <div className="row">
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ language: Number(val) })}
              floatingLabelText="Lenguaje"
              fullWidth
              type="number"
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ math: Number(val) })}
              floatingLabelText="Matemáticas"
              fullWidth
            />
          </div>
        </div>
        <div className="row">
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ science: Number(val) })}
              floatingLabelText="Ciencias"
              fullWidth
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ history: Number(val) })}
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
