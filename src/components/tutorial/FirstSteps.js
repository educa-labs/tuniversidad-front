import React, { Component } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import { fetch } from '../../actions/fetch';
import { capitalize } from '../../helpers/strings';
import Slides from './Slides';
import Welcome from './Welcome';
import City from './City';
import SecondSlide from './SecondSlide';


const getOptions = (items) => {
  if (is.null(items)) return [];
  const result = items.map(item => ({
    value: item.id, label: capitalize(item.title),
  }));
  return result;
};

class FirstSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 2,
      next: 2,
      region: null,
      city_id: null,
      date: null,
      rut: null,
      error: {},
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleRutChange = this.handleRutChange.bind(this);
  }

  disabled() {
    const { current } = this.state;
    if (current === 1) return !this.state.city_id;
    return false;
  }

  handleBack() {
    const { current, next } = this.state;
    if (current > 0) {
      this.setState({ next: next - 1 });
      setTimeout(() => {
        this.setState({ current: current - 1 });
      }, 300);
    }
  }
  handleNext() {
    const { current, next } = this.state;
    if (current < 2) {
      this.setState({
        current: current + 1,
        next: next + 1,
      });
    }
  }
  handleRegionChange(region) {
    this.setState({ region });
    this.props.fetch('cities', region, this.props.token);
  }
  handleCityChange(city) {
    this.setState({ city_id: city });
  }
  handleDateChange(date) {
    this.setState({ date });
  }
  handleRutChange(rut) {
    this.setState({ rut });
  }

  render() {
    return (
      <Slides
        current={this.state.current}
        next={this.state.next}
        lastIndex={2}
        onBackClick={this.handleBack}
        onNextClick={this.handleNext}
        disabled={this.disabled()}
      >
        <Welcome />
        <City
          region={this.state.region}
          city={this.state.city_id}
          regions={getOptions(this.props.regions)}
          cities={getOptions(this.props.cities)}
          handleRegionChange={this.handleRegionChange}
          handleCityChange={this.handleCityChange}
        />
        <SecondSlide
          handleDateChange={this.handleDateChange}
          handleRutChange={this.handleRutChange}
          rut={this.state.rut}
          date={this.state.rut}
          error={this.state.error}
        />
        <p>Segundo</p>
        <p>Tercero</p>
      </Slides>
    );
  }
}

const stateToProps = state => ({
  token: state.user.currentUser.auth_token,
  regions: state.fetch.regions,
  cities: state.fetch.cities,
});

export default connect(stateToProps, {
  fetch,
})(FirstSteps);
