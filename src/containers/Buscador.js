import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import FiltersDrawer from './FiltersDrawer';
import Results from '../components/Results';
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

  handleSubmit(event) {
    event.preventDefault();
    const { active, token } = this.props;
    const { input } = this.state;
    this.props.search(active, input, token);
  }


  render() {
    const { data, requesting } = this.props;
    let renderResults = null;
    if (is.null(data)) renderResults = <div>Busca lo que quieras</div>;
    else if (is.empty(data)) renderResults = <div>No hay resultados</div>;
    else {
      renderResults = (
        <div>
          {this.props.data.map(uni => uni.title)}
        </div>
      );
    }
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
        {renderResults}
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
    data: state.search.result,
    requesting: state.search.requesting,
  };
}

export default connect(mapStateToProps, {
  search,
})(Buscador);

