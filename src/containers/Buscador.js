import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FiltersDrawer from './FiltersDrawer';
import Results from '../components/Resulst';
import { toggleCompress } from '../actions/compress';
import SearchInput from '../components/inputs/SearchInput';
import Cover from '../components/Cover';

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
    return (
      <div className="buscador-container">
        <Cover compress={this.props.compress} />
        <SearchInput
          value={this.state.input}
          handleOnChange={value => this.setState({ input: value })}
          onClick={this.handleInputClick}
          onFilterClick={this.toggleFilters}
          compress={this.props.compress}
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

Buscador.propTypes = {
  compress: PropTypes.bool.isRequired,
  toggleCompress: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    compress: state.compress,
  };
}

export default connect(mapStateToProps, {
  toggleCompress,
})(Buscador);
