import React, { PropTypes, Component } from 'react';
import Filters from '../components/Filters';
import Results from '../components/Resulst';
import SearchInput from '../components/SearchInput';
import Selector from '../components/Selector';
import Cover from '../components/Cover';

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
    this.handleInputClick = this.handleInputClick.bind(this);
    if (this.props.compress) this.props.toggleCompress();
  }

  makeSelection(active) {
    this.setState({ active });
  }

  handleInputClick() {
    if (!this.props.compress) this.props.toggleCompress();
  }

  render() {
    const { active, input } = this.state;
    const { compress, toggleCompress } = this.props;
    return (
      <div className="buscador-container">
        <Cover compress={compress} />
        <SearchInput
          value={input}
          handleOnChange={value => this.setState({ input: value })}
          onClick={this.handleInputClick}
          compress={compress}
        />
        <Selector active={active} makeSelection={this.makeSelection} />
        <Filters
          type="universidades"
          show={active === 'universidades'}
          compress={compress}
          toggleCompress={toggleCompress}
        />
        <Filters
          type="carreras"
          show={active === 'carreras'}
          compress={compress}
          toggleCompress={toggleCompress}
        />
        <Results />
      </div>
    );
  }
}

Buscador.propTypes = {
  compress: PropTypes.bool.isRequired,
  toggleCompress: PropTypes.func.isRequired,
};

export default Buscador;
