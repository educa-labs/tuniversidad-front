import React, { Component } from 'react';
import FiltersDrawer from './FiltersDrawer';
import Results from '../components/Resulst';
import SearchInput from '../components/inputs/SearchInput';
import Banner from '../components/Banner';

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      showFilters: false,
    };
  }

  componentWillMount() {
    this.toggleFilters = this.toggleFilters.bind(this);
  }

  toggleFilters() {
    this.setState({ showFilters: !this.state.showFilters });
  }


  render() {
    return (
      <div className="buscador-container">
        <Banner location="site" />
        <SearchInput
          value={this.state.input}
          handleOnChange={value => this.setState({ input: value })}
          onClick={this.handleInputClick}
          onFilterClick={this.toggleFilters}
        />
        <FiltersDrawer
          open={this.state.showFilters}
          toggleFilters={this.toggleFilters}
        />
        <Results />
      </div>
    );
  }
}

export default Buscador;

