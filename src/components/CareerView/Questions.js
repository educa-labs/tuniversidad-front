import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import Help from 'material-ui/svg-icons/action/help-outline';

class Questions extends Component {
  render() {
    return (
      <div className="questions">
        <div className="new-question-form">
          <div className="text-input">
            <TextField
              hintText="Pregunta"
              fullWidth
            />
            <Help />
          </div>
        </div>
      </div>
    );
  }
}


export default Questions;
