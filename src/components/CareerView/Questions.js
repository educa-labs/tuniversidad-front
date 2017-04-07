import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import Help from 'material-ui/svg-icons/action/help-outline';

class Questions extends Component {
  render() {
    const { compress } = this.props;
    return (
      <div className="questions">
        <div className={`new-question-form ${compress ? 'compress' : ''}`}>
          <TextField
            floatingLabelText="Pregunta"
            hintText="Título de la pregunta"
            fullWidth
            floatingLabelFixed
          />
          <div className="help"><Help color="#C9C9C9" /></div>
          <TextField
            hintText="Describe tu pregunta"
            floatingLabelText="Descripción"
            fullWidth
            multiLine
            rowsMax={4}
            floatingLabelFixed
          />
        </div>
        <div className="title">Preguntas</div>
      </div>
    );
  }
}

Questions.propTypes = {
  compress: PropTypes.bool.isRequired,
};

export default Questions;
