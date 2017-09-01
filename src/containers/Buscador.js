import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FiltersDrawer from './FiltersDrawer';
import SearchInput from '../components/buscador/Input';
import { search, getNextPage, clearSearch } from '../actions/search';
import { setActiveFilter } from '../actions/filter';
import { fetch } from '../actions/fetch';
import SearchResult from '../components/buscador/Results';
import Selector from '../components/buscador/Selector';
import FilterTags from '../components/buscador/FilterTags';
import Filters from '../components/buscador/Filters';
import MobileBanner from './MobileBanner';
import { CAREER, UNIVERSITY, REGION, CITIES, SEMESTERS, DURATION, CUT, PRICE, SCHEDULE } from '../constants/strings';
import { MIN_CUT, MIN_DURATION, MIN_PRICE, MAX_CUT, MAX_DURATION, MAX_PRICE, MIN_SEMESTERS, MAX_SEMESTERS } from '../constants/num';
import '../styles/Buscador.css';

const mapFreeness = (value) => {
  if (value === 1) return false;
  if (value === 2) return true;
  return -1;
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

const isDefaultValue = (filterName, value) => {
  if (is.null(value)) return true;
  switch (filterName) {
    case 'min_cut': return value === MIN_CUT;
    case 'max_cut': return value === MAX_CUT;
    case 'min_price': return value === MIN_PRICE;
    case 'max_price': return value === MAX_PRICE;
    case 'min_duration': return value === MIN_DURATION;
    case 'max_duration': return value === MAX_DURATION;
    case 'min_semesters': return value === MIN_SEMESTERS;
    case 'max_semesters': return value === MAX_SEMESTERS;
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

  componentWillUnmount() {
    this.props.clearSearch();
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
    const tagName = (filterName, value) => {
      switch (filterName) {
        case 'max_cut':
        case 'min_cut': return `Corte: ${filters.min_cur} - ${filters.max_cut}`;
        case 'max_price':
        case 'min_price': return PRICE;
        case 'min_semesters':
        case 'max_semesters': return SEMESTERS;
        case 'region_id': return `Región: ${this.props.regions[value].title}`;
        case 'cities': return CITIES;
        default: return '';
      }
    };

    if (afterSearch) return [];
    const result = [];
    Object.keys(filters).forEach((filterName) => {
      if (!isDefaultValue(filterName, filters[filterName])) {
        result.push(tagName(filterName, filters[filterName]));
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
            <FilterTags activeFilters={this.getActivefilters(filters, afterSearch)} />
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
              active={active}
              token={this.props.token}
              
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
    requesting: state.search.requesting || state.fetch.requesting,
    hasMore: state.search.hasMore,
    currentPage: state.search.current_page,
    university_filters: {
      region_id: state.filter.region_id !== -1 ? state.filter.region_id : null,
      cities: state.filter.cities !== -1 ? state.filter.cities : null,
      university_type_id: state.filter.university_type !== -1 ? state.filter.university_type : null,
      freeness: state.filter.freeness !== -1 ? state.filter.freeness : null,
    },
    career_filters: {
      region_id: state.filter.region_id !== -1 ? state.filter.region_id : null,
      cities: state.filter.cities !== -1 ? state.filter.cities : null,
      area: state.filter.area !== -1 ? state.filter.area : null,
      min_cut: state.filter.cut ? state.filter.cut.min : null,
      max_cut: state.filter.cut ? state.filter.cut.max : null,
      min_price: state.filter.price ? state.filter.price.min : null,
      max_price: state.filter.price ? state.filter.price.max : null,
      min_semesters: state.filter.duration ? state.filter.duration.min : null,
      max_semesters: state.filter.duration ? state.filter.duration.max : null,
      schedule: state.filter.schedule ? state.filter.schedule : null,
    },
    regions: state.fetch.regions,
  };
}

export default connect(mapStateToProps, {
  search,
  fetch,
  getNextPage,
  clearSearch,
  setActiveFilter,
})(Buscador);

