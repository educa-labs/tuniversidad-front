import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FiltersDrawer from './FiltersDrawer';
import Results from '../components/Resulst';
import SearchInput from '../components/inputs/SearchInput';
import Banner from '../components/Banner';
import { search } from '../actions/search';

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleFilters() {
    this.setState({ showFilters: !this.state.showFilters });
  }

  handleSubmit() {
    const { active, token } = this.props;
    const { input } = this.state;
    this.props.search(active, input, token);
  }


  render() {
    return (
      <div className="buscador-container">
        <Banner location="site" />
        <SearchInput
          value={this.state.input}
          handleOnChange={value => this.setState({ input: value })}
          onFilterClick={this.toggleFilters}
          handleSubmit={this.handleSubmit}
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
  token: PropTypes.string.isRequired,
  active: PropTypes.number.isRequired,
  search: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.user.currentUser.auth_token,
    active: state.filter.active,
  };
}

export default connect(mapStateToProps, {
  search,
})(Buscador);

