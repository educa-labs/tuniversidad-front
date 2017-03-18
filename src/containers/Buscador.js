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
      expandFilters: false,
    };
  }

  componentWillMount() {
    this.makeSelection = this.makeSelection.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    if (this.props.compress) this.props.toggleCompress();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    console.log(event.srcElement.body.scrollTop);
  }

  makeSelection(active) {
    this.setState({ active });
  }

  handleInputClick() {
    if (!this.props.compress) this.props.toggleCompress();
  }

  toggleFilters() {
    this.setState({ expandFilters: !this.state.expandFilters });
    if (!this.props.compress) this.props.toggleCompress();
  }

  render() {
    const { active, input, expandFilters } = this.state;
    const { compress } = this.props;
    return (
      <div className="buscador-container">
        <div className={`cover ${compress ? 'compress' : ''}`}>
          <span>Información de más de 100 universidades</span>
        </div>
        <div
          className={`input-container ${compress ? 'compress' : ''}`}
          onClick={this.handleInputClick}
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
        <Filters
          onClick={this.toggleFilters}
          expanded={expandFilters}
          active={active}
        />
      </div>
    );
  }
}

Buscador.propTypes = {
  compress: PropTypes.bool.isRequired,
  toggleCompress: PropTypes.func.isRequired,
};

export default Buscador;
