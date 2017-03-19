import React, { Component, PropTypes } from 'react';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconButton from 'material-ui/IconButton';
import SelectInput from './SelectInput';
import '../styles/Filters.css';

const tipos = [
  { value: 0, label: 'Todas' },
  { value: 1, label: 'Privada' },
  { value: 2, label: 'Estatal' },
];

const regiones = [
  { value: 0, label: 'Todas' },
  { value: 1, label: 'Metropolitana' },
  { value: 2, label: 'Coquimbo' },
];

const paises = [
  { value: 0, label: 'Todos' },
  { value: 1, label: 'Chile' },
  { value: 2, label: 'Argentina' },
];

const opciones = [
  { value: 0, label: 'Todas' },
  { value: 1, label: 'Si' },
  { value: 2, label: 'No' },
];

const idiomas = [
  { value: 0, label: 'Todas' },
  { value: 1, label: 'Español' },
  { value: 2, label: 'Inglés' },
];

class Filters extends Component {
  constructor(props) {
    super(props);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  componentWillMount() {
    this.setState({ expanded: false });
    if (this.props.type === 'universidades') {
      this.setState({
        type: null,
        country: null,
        region: null,
        gratuidad: null,
      });
    } else {
      this.setState({
        area: null,
        country: null,
        duration: [0, 0],
        region: null,
        language: null,
        arancel: [0, 0],
      });
    }
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
    if (!this.props.compress) this.props.toggleCompress();
  }

  render() {
    const { show } = this.props;
    const { expanded } = this.state;
    const fields = this.props.type === 'universidades' ? (
      <div className="fields-container">
        <div className="row">
          <SelectInput
            title="Tipo de Universidad"
            items={tipos}
            value={this.state.type}
            handleChange={type => this.setState({ type })}
          />
          <SelectInput
            title="Region"
            items={regiones}
            value={this.state.region}
            handleChange={region => this.setState({ region })}
          />
        </div>
        <div className="row">
          <SelectInput
            title="Pais"
            items={paises}
            value={this.state.country}
            handleChange={country => this.setState({ country })}
          />
          <SelectInput
            title="Gratuidad"
            items={opciones}
            value={this.state.gratuidad}
            handleChange={gratuidad => this.setState({ gratuidad })}
          />
        </div>
      </div>
    ) : (
      <div className="fields-container">
        <div className="row">
          <SelectInput
            title="Area"
            items={tipos}
            value={this.state.area}
            handleChange={area => this.setState({ area })}
          />
          <SelectInput
            title="Region"
            items={regiones}
            value={this.state.region}
            handleChange={region => this.setState({ region })}
          />
        </div>
        <div className="row" >
          <SelectInput
            title="Pais"
            items={paises}
            value={this.state.country}
            handleChange={country => this.setState({ country })}
          />
          <SelectInput
            title="Idioma"
            items={idiomas}
            value={this.state.language}
            handleChange={language => this.setState({ language })}
          />
        </div>
      </div>
    );
    return (
      <div className={`filters-container ${expanded ? 'expand' : ''} ${show ? '' : 'hidden'}`}>
        <div className="filter-banner" onTouchTap={this.toggleExpand}>
          <IconButton className="icon-button">
            {expanded ?
              <ArrowUp color="white" /> :
              <ArrowDown color="white" />}
          </IconButton>
          <span>Filtros</span>
        </div>
        {fields}
      </div>
    );
  }
}

Filters.propTypes = {
  show: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  toggleCompress: PropTypes.func.isRequired,
  compress: PropTypes.bool.isRequired,
};


export default Filters;
