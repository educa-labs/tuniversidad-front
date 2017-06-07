import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
  button: {
    margin: '0 5px',
  },
};

class UserTargetForm extends Component {

  componentWillMount() {
    this.setState({
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
        title="Mi Objetivo"
        actions={actions}
        open={this.props.open}
        className="form"
        contentStyle={{ width: '32rem' }}
        onRequestClose={this.props.handleClose}
      >
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
              type="number"
            />
          </div>
        </div>
        <div className="row">
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ science: Number(val) })}
              floatingLabelText="Ciencias"
              fullWidth
              type="number"
            />
          </div>
          <div className="form__field">
            <TextField
              onChange={(e, val) => this.setState({ history: Number(val) })}
              floatingLabelText="Historia"
              fullWidth
              type="number"
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default UserTargetForm;
