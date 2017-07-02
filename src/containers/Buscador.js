import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FiltersDrawer from './FiltersDrawer';
import SearchInput from '../components/inputs/SearchInput';
import { search, getNextPage } from '../actions/search';
import { fetch } from '../actions/fetch';
import SearchResult from '../components/SearchResult';
import MobileBanner from './MobileBanner';
import '../styles/Buscador.css';

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      showFilters: false,
      dataTypeHasChanged: false,
    };
    this.toggleFilters = this.toggleFilters.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInfinite = this.handleInfinite.bind(this);
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

  handleInfinite() {
    const { active, token, currentPage } = this.props;
    const { input } = this.state;
    const filters = active === 'university' ? this.props.university_filters : this.props.career_filters;
    this.props.getNextPage(active, input, token, filters, currentPage);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { active, token } = this.props;
    const { input } = this.state;
    const filters = active === 'university' ? this.props.university_filters : this.props.career_filters;
    this.props.search(active, input, token, filters);
    if (this.state.showFilters) this.setState({ showFilters: false });
  }


  render() {
    return (
      <div className="col">
        {this.props.mobile ? <MobileBanner onClick={this.props.toggleMenu} /> : null}
        <SearchInput
          value={this.state.input}
          handleOnChange={value => this.setState({ input: value })}
          toggleFilters={this.toggleFilters}
          handleSubmit={this.handleSubmit}
          active={this.props.active}
          mobile={this.props.mobile}
        />
        <FiltersDrawer
          mobile={this.props.mobile}
          open={this.state.showFilters}
          toggleFilters={this.toggleFilters}
          onRequestChange={open => this.setState({ showFilters: open })}
          handleSubmit={this.handleSubmit}
        />
        <div className="row no-margin full-height">
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
          {this.props.mobile ? null : <div className="empty-left" />}
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

function mapStateToProps(state) {
  return {
    token: state.user.currentUser.auth_token,
    active: state.filter.active,
    data: state.search.result,
    careers: state.search.popular_careers,
    universities: state.search.popular_univ,
    result: state.fetch.result,
    requesting: state.search.requesting || state.fetch.requesting,
    infiniteLoading: state.search.infiniteLoading,
    hasMore: state.search.hasMore,
    university_filters: {
      cities: state.filter.cities !== -1 ? state.filter.cities : null,
      university_type_id: state.filter.university_type !== -1 ? state.filter.university_type : null,
      freeness: state.filter.freeness !== -1 ? state.filter.freeness : null,
    },
    career_filters: {
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
})(Buscador);

