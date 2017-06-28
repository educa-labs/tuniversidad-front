import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class Objectives extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
      math: '',
      science: '',
      history: '',
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
        <div className={`col padding-${this.props.mobile ? '1' : '7'}`}>
          Ingresa los puntajes que quieres obtener en cada prueba
          <div className="row">
            <div className="col margin-right">
              <TextField
                onChange={(e, val) => this.handleLanguageChange(val)}
                floatingLabelText="Lenguaje"
                value={this.state.language}
                type="number"
                errorText={this.props.error.language}
                fullWidth
              />
              <TextField
                onChange={(e, val) => this.handleHistoryChange(val)}
                floatingLabelText="Historia"
                value={this.state.history}
                type="number"
                errorText={this.props.error.history}
                fullWidth
              />
            </div>
            <div className="col margin-left">
              <TextField
                onChange={(e, val) => this.handleMathChange(val)}
                floatingLabelText="Matemáticas"
                value={this.state.math}
                type="number"
                errorText={this.props.error.math}
                fullWidth
              />
              <TextField
                fullWidth
                onChange={(e, val) => this.handleScienceChange(val)}
                floatingLabelText="Ciencias"
                value={this.state.science}
                type="number"
                errorText={this.props.error.science}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Objectives.propTypes = {
  logHistoryChange: PropTypes.func.isRequired,
  logLangChange: PropTypes.func.isRequired,
  logMathChange: PropTypes.func.isRequired,
  logScienceChange: PropTypes.func.isRequired,
};

export default Objectives;
