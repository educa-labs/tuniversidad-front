import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import FiltersDrawer from './FiltersDrawer';
import SearchInput from '../components/inputs/SearchInput';
import Banner from '../components/Banner';
import { search } from '../actions/search';
import UniversityCard from '../components/UniversityCard';
import CareerCard from '../components/CareerCard';

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
    const { data, requesting, active } = this.props;
    const beforeSearch = <div>Recuerda que puedes aplicar filtros a tu búsqueda</div>;
    let afterSearch = null;
    if (is.not.null(data)) {
      afterSearch = data.map((res) => {
        if (active === 'university') return <UniversityCard university={res} key={res.id} />;
        return <CareerCard career={res} key={res.id} />;
      });
      if (is.empty(afterSearch)) {
        afterSearch = <div>No hay resultados</div>;
      }
    }
    return (
      <div className="buscador-container">
        <Banner location="site" />
        <SearchInput
          value={this.state.input}
          handleOnChange={value => this.setState({ input: value })}
          onFilterClick={this.toggleFilters}
          handleSubmit={this.handleSubmit}
          active={active}
        />
        <FiltersDrawer
          open={this.state.showFilters}
          toggleFilters={this.toggleFilters}
        />
        {afterSearch || beforeSearch}
      </div>
    );
  }
}

Buscador.propTypes = {
  token: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.user.currentUser.auth_token,
    active: state.filter.active,
    data: state.search.result,
    result: state.fetch.result,
    requesting: state.search.requesting,
  };
}

export default connect(mapStateToProps, {
  search,
})(Buscador);

