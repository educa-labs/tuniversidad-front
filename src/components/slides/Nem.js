import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class Nem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nem: null,
      ranking: null,
    };
  }
  handleNemChange(val) {
    this.props.logNemChange(val);
    this.setState({ nem: val });
  }

  handleRankingChange(val) {
    this.props.logRankingName(val);
    this.setState({ ranking: val });
  }

  render() {
    return (
      <div className="slide">
        <div className="slide-header">
          ¿Cuáles son tus puntajes de enseñanza media?
        </div>
        <div className="slide-body">
          Si aún estás en el colegio puedes estimar cúanto obtendrás
          <div className="slide-field">
            <TextField
              onChange={(e, val) => this.handleNemChange(val)}
              floatingLabelText="Nem"
              value={this.state.nem}
              type="number"
            />
          </div>
          <div className="slide-field">
            <TextField
              onChange={(e, val) => this.handleRankingChange(val)}
              floatingLabelText="Ranking"
              value={this.state.ranking}
              type="number"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Nem;
