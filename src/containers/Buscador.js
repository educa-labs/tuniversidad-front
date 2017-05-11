import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import FiltersDrawer from './FiltersDrawer';
import SearchInput from '../components/inputs/SearchInput';
import Banner from '../components/Banner';
import { search } from '../actions/search';
import { fetch } from '../actions/fetch';
import UniversityCard from '../components/UniversityCard';
import CareerCard from '../components/CareerCard';

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      showFilters: false,
      dataTypeHasChanged: false,
    };
  }

  componentWillMount() {
    this.toggleFilters = this.toggleFilters.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.fetch('areas', null, null);
    this.props.fetch('types', null, null);
    this.props.fetch('schedules', null, null);
    this.props.fetch('regions', null, this.props.token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      this.setState({
        dataTypeHasChanged: true,
        input: '',
      });
    }
    if (nextProps.data !== this.props.data) {
      if (nextProps.active === this.props.active) {
        this.setState({ dataTypeHasChanged: false });
      }
    }
  }

  toggleFilters() {
    if (!this.props.requesting) {
      this.setState({ showFilters: !this.state.showFilters });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { active, token } = this.props;
    const { input } = this.state;
    this.props.search(active, input, token);
  }


  render() {
    const { data, requesting, active } = this.props;
    const { dataTypeHasChanged } = this.state;
    const beforeSearch = <div>Recuerda que puedes aplicar filtros a tu búsqueda</div>;

    let afterSearch = null;
    if (is.not.null(data)) {
      if (requesting) afterSearch = <div>Cargando ...</div>;
      else if (data === []) afterSearch = <div>No hay resultados</div>;
      else if (active === 'university') afterSearch = dataTypeHasChanged ? null : data.map(res => <UniversityCard university={res} key={res.id} />);
      else if (active === 'carreer') afterSearch = dataTypeHasChanged ? null : data.map(res => <CareerCard career={res} key={res.id} />);
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
  requesting: PropTypes.bool.isRequired,
  fetch: PropTypes.func.isRequired,
  data: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    token: state.user.currentUser.auth_token,
    active: state.filter.active,
    data: state.search.result,
    result: state.fetch.result,
    requesting: state.search.requesting || state.fetch.requesting,
  };
}

export default connect(mapStateToProps, {
  search,
  fetch,
})(Buscador);

