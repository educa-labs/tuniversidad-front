import React, { PropTypes, Component } from 'react';
import FiltersDrawer from './FiltersDrawer';
import Results from '../components/Resulst';
import SearchInput from '../components/inputs/SearchInput';
import Cover from '../components/Cover';

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      showFilters: true,
    };
  }

  componentWillMount() {
    this.toggleFilters = this.toggleFilters.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    if (this.props.compress) this.props.toggleCompress();
  }

  toggleFilters() {
    this.setState({ showFilters: !this.state.showFilters });
  }

  handleInputClick() {
    if (!this.props.compress) this.props.toggleCompress();
  }

  render() {
    const { input, showFilters } = this.state;
    const { compress } = this.props;
    return (
      <div className="buscador-container">
        <Cover compress={compress} />
        <SearchInput
          value={input}
          handleOnChange={value => this.setState({ input: value })}
          onClick={this.handleInputClick}
          onFilterClick={this.toggleFilters}
          compress={compress}
        />
        <FiltersDrawer
          open={showFilters}
          toggleFilters={this.toggleFilters}
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
