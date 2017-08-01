import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class Nem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nem: '',
      ranking: '',
    };
  }
  handleNemChange(val) {
    this.props.logNemChange(val);
    this.setState({ nem: val });
  }

  handleRankingChange(val) {
    this.props.logRankingChange(val);
    this.setState({ ranking: val });
  }

  render() {
    return (
      <div className={`slide ${this.props.mobile ? 'slide-mobile' : ''}`}>
        <div className="slide-header">
          ¿Cuáles son tus puntajes de enseñanza media?
        </div>
        <div className={`col padding-${this.props.mobile ? '2' : '8'}`}>
          Si aun estás en el colegio puedes estimar cuánto obtendrás
          <TextField
            onChange={(e, val) => this.handleNemChange(val)}
            floatingLabelText="Nem"
            value={this.state.nem}
            type="number"
            errorText={this.props.error.nem}
            fullWidth
          />
          <TextField
            onChange={(e, val) => this.handleRankingChange(val)}
            floatingLabelText="Ranking"
            value={this.state.ranking}
            type="number"
            errorText={this.props.error.ranking}
            fullWidth
          />
        </div>
      </div>
    );
  }
}

Nem.propTypes = {
  logNemChange: PropTypes.func.isRequired,
  logRankingChange: PropTypes.func.isRequired,
};

export default Nem;
