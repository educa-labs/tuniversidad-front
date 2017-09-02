import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import SearchInput from '../components/buscador/Input';
import { search, getNextPage, clearSearch, makeSubmit as onClearFilter } from '../actions/search';
import { setActiveFilter, clearFilterValue } from '../actions/filter';
import { fetch } from '../actions/fetch';
import SearchResult from '../components/buscador/Results';
import Selector from '../components/buscador/Selector';
import FilterTags from '../components/buscador/FilterTags';
import Filters from '../components/buscador/Filters';
import MobileBanner from './MobileBanner';
import { CAREER, UNIVERSITY } from '../constants/strings';
import { numeral } from '../helpers/numeral';
import { capitalize } from '../helpers/strings';
import { MIN_CUT, MIN_DURATION, MIN_PRICE, MAX_CUT, MAX_DURATION, MAX_PRICE, MIN_SEMESTERS, MAX_SEMESTERS } from '../constants/num';
import '../styles/Buscador.css';

const mapFreeness = (value) => {
  if (value === 1) return false;
  if (value === 2) return true;
  return -1;
};

const freeness2String = (value) => {
  if (value === 1) return 'No';
  if (value === 2) return 'Sí';
  return '';
};

const searchResultFeedback = (active, afterSearch, data) => {
  if (!afterSearch) {
    if (active === CAREER) {
      return 'Carreras más buscadas';
    }
    return 'Universidades más buscadas';
  }
  if (is.empty(data)) return 'La búsqueda no produjo resultados';
  return 'Resultados';
};

const inputPlaceholder = (active) => {
  if (active === CAREER) {
    return 'Busca una carrera';
  }
  return 'Busca una universidad';
};

const getResults = (active, afterSearch, result, careers, univs) => {
  if (!afterSearch) {
    if (active === CAREER) return careers;
    return univs;
  }
  return result;
};

const getItemWithId = (array, id) => (
  array.filter(item => item.id === id)[0]
);


const isDefaultValue = (filterName, value) => {
  if (is.null(value)) return true;
  switch (filterName) {
    case 'cut': return value.min === MIN_CUT && value.max === MAX_CUT;
    case 'price': return value.min === MIN_PRICE && value.max === MAX_PRICE;
    case 'duration': return value.min === MIN_DURATION && value.max === MAX_DURATION;
    default: return false;
  }
};


class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      showFilters: false,
      dataTypeHasChanged: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInfinite = this.handleInfinite.bind(this);
    this.handleActiveChange = this.handleActiveChange.bind(this);
    this.getActivefilters = this.getActivefilters.bind(this);
  }


  componentDidMount() {
    if (this.props.mobile) {
      if (this.props.makeSubmit) this.handleSubmit();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.makeSubmit !== this.props.makeSubmit) {
      if (nextProps.makeSubmit) {
        const filters = nextProps.active === UNIVERSITY ? nextProps.university_filters :  nextProps.career_filters; 
        if (filters.freeness) filters.freeness = mapFreeness(filters.freeness);
        nextProps.search(nextProps.active, this.state.input, nextProps.token, filters);
      }
    }
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
      if (nextProps.data === null) this.setState({ input: '' });
    }
  }

  handleInfinite() {
    const { active, token, currentPage } = this.props;
    const { input } = this.state;
    const filters = active === UNIVERSITY ? this.props.university_filters : this.props.career_filters;
    if (filters.freeness) filters.freeness = mapFreeness(filters.freeness);
    this.props.getNextPage(active, input, token, filters, currentPage);
  }

  handleSubmit(event) {
    if (event) event.preventDefault();
    const { active, token } = this.props;
    const { input } = this.state;
    const filters = active === UNIVERSITY ? this.props.university_filters : this.props.career_filters;
    if (filters.freeness) filters.freeness = mapFreeness(filters.freeness);
    this.props.search(active, input, token, filters);
    if (this.state.showFilters) this.setState({ showFilters: false });
  }

  handleActiveChange(value) {
    this.props.setActiveFilter(value);
    this.props.clearSearch();
  }


  getActivefilters(filters, afterSearch) {
    if (!afterSearch) return [];
    const tagName = (filterName, value) => {
      switch (filterName) {
        case 'cut': return `Corte: ${filters.cut.min} - ${filters.cut.max}`;
        case 'price': return `Arancel: $${numeral(filters.price.min)} - $${numeral(filters.price.max)}`;
        case 'duration': return `Duración: ${filters.duration.min} a ${filters.duration.max} semestres`;
        case 'region_id': return `Región: ${this.props.regions[value - 1].title}`;
        case 'city_ids': return `Ciudad: ${getItemWithId(this.props.cities, value).title}`;
        case 'schedule': return `Horario: ${capitalize(filters.schedule)}`;
        case 'university_type': return `Tipo de universidad: ${getItemWithId(this.props.types, filters.university_type).title}`;
        case 'freeness': return `Gratuidad: ${freeness2String(filters.freeness)}`;
        case 'area': return `Área: ${getItemWithId(this.props.areas, filters.area).title}`;
        default: return '';
      }
    };

    const result = [];
    Object.keys(filters).forEach((filterName) => {
      if (!isDefaultValue(filterName, filters[filterName])) {
        result.push({
          title: tagName(filterName, filters[filterName]),
          filter: filterName,
          value: filters[filterName],
        });
      }
    });
    return result;
  }


  render() {
    const { active, popCareers, afterSearch, result, popUniversities, requesting } = this.props;
    const data = getResults(active, afterSearch, result, popCareers, popUniversities);
    const feedback = searchResultFeedback(active, afterSearch, data);
    const placeholder = inputPlaceholder(active);
    const filters = active === UNIVERSITY ? this.props.university_filters : this.props.career_filters;
    const activeFilters = this.getActivefilters(filters, afterSearch);
    return (
      <div className="col">
        {this.props.mobile ? <MobileBanner onClick={this.props.toggleMenu} /> : null}
        <SearchInput
          value={this.state.input}
          handleOnChange={value => this.setState({ input: value })}
          placeholder={placeholder}
          // openFilters={openFilters}
          requesting={requesting}
          handleSubmit={this.handleSubmit}
          active={active}
          afterSearch={afterSearch}
          mobile={this.props.mobile}
          clearSearch={this.props.clearSearch}
        />
        <div className="search-content-page">
          <div className="search-results">
            <Selector active={this.props.active} onSelect={this.handleActiveChange} />
            <FilterTags
              activeFilters={activeFilters}
              clearFilterValue={this.props.clearFilterValue}
              makeSubmit={this.props.onClearFilter}
            />
            <SearchResult
              feedback={feedback}
              data={data}
              active={this.props.active}
              requesting={this.props.requesting}
              handleInfinite={this.handleInfinite}
              hasMore={this.props.hasMore}
              mobile={this.props.mobile}
            />
          </div>
          <div className="search-filters">
            <Filters
              getCities={id => this.props.fetch('cities', id, this.props.token)}
            />
          </div>
        </div>
      </div>
    );
  }
}


Buscador.defaultProps = {
  mobile: false,
};

Buscador.propTypes = {
  token: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  requesting: PropTypes.bool.isRequired,
  fetch: PropTypes.func.isRequired,
  mobile: PropTypes.bool,
  data: PropTypes.array,
  popular: PropTypes.array,
  getNextPage: PropTypes.func.isRequired,
};

Buscador.contextTypes = {
  router: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    token: state.user.currentUser.auth_token,
    active: state.filter.active,
    result: state.search.result,
    afterSearch: state.search.afterSearch,
    popCareers: state.search.popular_careers,
    popUniversities: state.search.popular_univ,
    makeSubmit: state.search.makeSubmit,
    requesting: state.search.requesting,
    hasMore: state.search.hasMore,
    currentPage: state.search.current_page,
    university_filters: {
      region_id: state.filter.region_id !== -1 ? state.filter.region_id : null,
      city_ids: state.filter.cities !== -1 ? state.filter.cities : null,
      university_type: state.filter.university_type !== -1 ? state.filter.university_type : null,
      freeness: state.filter.freeness !== -1 ? state.filter.freeness : null,
    },
    career_filters: {
      region_id: state.filter.region_id !== -1 ? state.filter.region_id : null,
      city_ids: state.filter.cities !== -1 ? state.filter.cities : null,
      area: state.filter.area !== -1 ? state.filter.area : null,
      cut: state.filter.cut ? {
        min: state.filter.cut.min,
        max: state.filter.cut.max,
      } : null,
      price: state.filter.price ? {
        min: state.filter.price.min,
        max: state.filter.price.max,
      } : null,
      duration: state.filter.duration ? {
        min: state.filter.duration.min,
        max: state.filter.duration.max,
      } : null,
      schedule: state.filter.schedule ? state.filter.schedule : null,
    },
    regions: state.fetch.regions,
    cities: state.fetch.cities,
    types: state.fetch.types,
    areas: state.fetch.areas,
  };
}

export default connect(mapStateToProps, {
  search,
  fetch,
  getNextPage,
  clearSearch,
  setActiveFilter,
  clearFilterValue,
  onClearFilter,
})(Buscador);

