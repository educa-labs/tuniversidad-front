import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FiltersDrawer from './FiltersDrawer';
import SearchInput from '../components/inputs/SearchInput';
import { search, getNextPage, clearSearch } from '../actions/search';
import { fetch } from '../actions/fetch';
import SearchResult from '../components/SearchResult';
import MobileBanner from './MobileBanner';
import '../styles/Buscador.css';

const mapFreeness = (value) => {
  if (value === 1) return false;
  if (value === 2) return true;
  return -1;
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
    const filters = active === 'university' ? this.props.university_filters : this.props.career_filters;
    if (filters.freeness) filters.freeness = mapFreeness(filters.freeness);
    this.props.getNextPage(active, input, token, filters, currentPage);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { active, token } = this.props;
    const { input } = this.state;
    const filters = active === 'university' ? this.props.university_filters : this.props.career_filters;
    if (filters.freeness) filters.freeness = mapFreeness(filters.freeness);
    this.props.search(active, input, token, filters);
    if (this.state.showFilters) this.setState({ showFilters: false });
  }


  render() {
    const openFilters = () => this.context.router.push('/filters');
    return (
      <div className="col">
        {this.props.mobile ? <MobileBanner onClick={this.props.toggleMenu} /> : null}
        <SearchInput
          value={this.state.input}
          handleOnChange={value => this.setState({ input: value })}
          openFilters={openFilters}
          requesting={this.props.requesting}
          handleSubmit={this.handleSubmit}
          active={this.props.active}
          mobile={this.props.mobile}
          clearSearch={this.props.clearSearch}
          afterSearch={this.props.data !== null}
        />
        {this.props.mobile ? null : (
          <FiltersDrawer
            open
            handleSubmit={this.handleSubmit}
          />
        )}
        <div className={`page page-filters ${this.props.mobile ? 'page-mobile' : ''}`}>
          <SearchResult
            data={this.props.data}
            popularCareers={this.props.careers}
            popularUniv={this.props.universities}
            active={this.props.active}
            dataTypeHasChanged={this.state.dataTypeHasChanged}
            requesting={this.props.requesting}
            handleInfinite={this.handleInfinite}
            hasMore={this.props.hasMore}
            mobile={this.props.mobile}
          />
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
    data: state.search.result,
    careers: state.search.popular_careers,
    universities: state.search.popular_univ,
    makeSubmit: state.search.makeSubmit,
    requesting: state.search.requesting || state.fetch.requesting,
    hasMore: state.search.hasMore,
    currentPage: state.search.current_page,
    result: state.fetch.result,
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
    },
  };
}

export default connect(mapStateToProps, {
  search,
  fetch,
  getNextPage,
  clearSearch,
})(Buscador);

