import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FiltersDrawer from './FiltersDrawer';
import SearchInput from '../components/inputs/SearchInput';
import { search } from '../actions/search';
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
  }

  componentWillMount() {
    this.toggleFilters = this.toggleFilters.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const filters = active === 'university' ? this.props.university_filters : this.props.career_filters;
    this.props.search(active, input, token, filters);
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
        />
        <div className="row no-margin full-height">
          <SearchResult
            data={this.props.data}
            popular={this.props.popular}
            active={this.props.active}
            dataTypeHasChanged={this.state.dataTypeHasChanged}
            requesting={this.props.requesting}
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
};

function mapStateToProps(state) {
  return {
    token: state.user.currentUser.auth_token,
    active: state.filter.active,
    data: state.search.result,
    popular: state.search.popular,
    result: state.fetch.result,
    requesting: state.search.requesting || state.fetch.requesting,
    university_filters: {
      cities: state.filter.cities,
      university_type_id: state.filter.university_type,
      freeness: state.filter.freeness,
    },
    career_filters: {
      cities: state.filter.cities,
      area: state.filter.area,
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
})(Buscador);

