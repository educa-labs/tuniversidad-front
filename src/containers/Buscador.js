import React, { PropTypes, Component } from 'react';
import Search from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import Filters from '../components/Filters';
import '../styles/Buscador.css';

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      active: 'universidades',
    };
  }

  componentWillMount() {
    this.makeSelection = this.makeSelection.bind(this);
    if (this.props.compress) this.props.toggleCompress();
  }

  makeSelection(active) {
    this.setState({ active });
  }

  render() {
    const { active, input } = this.state;
    const { toggleCompress, compress } = this.props;
    return (
      <div className="buscador-container">
        <div className={`cover ${compress ? 'compress' : ''}`}>
          <span>Información de más de 100 universidades</span>
        </div>
        <div
          className={`input-container ${compress ? 'compress' : ''}`}
          onClick={toggleCompress}
        >
          <IconButton>
            <Search color="#C9C9C9" />
          </IconButton>
          <input
            type="text"
            value={input}
            onChange={e => this.setState({ input: e.target.value })}
            placeholder="Busca lo que quieras"
          />
        </div>
        <div className="selector">
          <div
            onClick={() => this.makeSelection('universidades')}
            className={active === 'universidades' ? 'active' : null}
          >
            Universidades
          </div>
          <div
            onClick={() => this.makeSelection('carreras')}
            className={active === 'carreras' ? 'active' : null}
          >
            Carreras
          </div>
        </div>
        <Filters />
      </div>
    );
  }
}

Buscador.propTypes = {
  compress: PropTypes.bool.isRequired,
  toggleCompress: PropTypes.func.isRequired,
};

export default Buscador;
