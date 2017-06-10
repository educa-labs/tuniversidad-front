import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class Objectives extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: null,
      math: null,
      science: null,
      history: null,
    };
  }
  handleLanguageChange(val) {
    this.props.logLangChange(val);
    this.setState({ language: val });
  }

  handleMathChange(val) {
    this.props.logMathChange(val);
    this.setState({ math: val });
  }

  handleHistoryChange(val) {
    this.props.logHistoryChange(val);
    this.setState({ history: val });
  }

  handleScienceChange(val) {
    this.props.logScienceChange(val);
    this.setState({ science: val });
  }

  render() {
    return (
      <div className="slide">
        <div className="slide-header">
          ¿Cuánto quieres sacar en la PSU?
        </div>
        <div className="slide-body">
          Ingresa los puntajes que quieres obtener en cada prueba
          <div className="row">
            <div className="slide-field slide-field__row">
              <TextField
                onChange={(e, val) => this.handleLanguageChange(val)}
                floatingLabelText="Lenguaje"
                value={this.state.language}
                type="number"
              />
            </div>
            <div className="slide-field slide-field__row">
              <TextField
                onChange={(e, val) => this.handleMathChange(val)}
                floatingLabelText="Matemáticas"
                value={this.state.math}
                type="number"
              />
            </div>
          </div>
          <div className="row">
            <div className="slide-field slide-field__row">
              <TextField
                onChange={(e, val) => this.handleHistoryChange(val)}
                floatingLabelText="Historia"
                value={this.state.history}
                type="number"
              />
            </div>
            <div className="slide-field slide-field__row">
              <TextField
                onChange={(e, val) => this.handleScienceChange(val)}
                floatingLabelText="Ciencias"
                value={this.state.science}
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Objectives;