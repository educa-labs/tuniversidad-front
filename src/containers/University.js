import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import is from 'is_js';
import { getCareers } from '../helpers/api';
import NavigationBar from '../components/NavigationBar';
import UniversityCard from '../components/UniversityCard';
import CareerCard from '../components/CareerCard';
import { fetch } from '../actions/fetch';
import '../styles/University.css';


class University extends Component {

  componentWillMount() {
    const { params, token } = this.props;
    this.props.fetch('university', params.id, token);
    this.setState({
      src: '',
      slideIndex: 0,
      careers: null,
    });
    this.handleSlideChange = this.handleSlideChange.bind(this);
    getCareers(this.props.params.id, this.props.token)
      .then(res => this.setState({ careers: res.body }))
      .catch(err => this.setState({ careers: err.body }));
  }

  handleSlideChange(value) {
    this.setState({ slideIndex: value });
  }

  render() {
    const { careers, slideIndex } = this.state;
    const { university, mobile } = this.props;
    if (is.any.null(university, careers)) {
      return (
        <div>
          Cargando ...
        </div>
      );
    }
    return (
      <div className="col col-1">
        <NavigationBar location="site" title={university.title} />
        <div className="university-cover">
          {mobile ? null : (
            <div>
              <div className="university-cover__title">{university.title}</div>
              <div className="university-cover__subtitle">{university.motto}</div>
            </div>
          )}
        </div>
        <Tabs
          onChange={this.handleSlideChange}
          value={slideIndex}
          className="tabs-search"
        >
          <Tab label="Información general" value={0} />
          <Tab label="Carreras" value={1} />
        </Tabs >
          {slideIndex === 0 ? (
            <UniversityCard university={university} detail mobile={mobile} />
            ) : null }
          {slideIndex === 1 ? (
            this.state.careers.map((car) => {
              return <CareerCard career={car} key={car.id} mobile={mobile} compress />
            })
          ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.currentUser.auth_token,
    university: state.fetch.university,
  };
}

University.propTypes = {
  fetch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  params: PropTypes.object,
  university: PropTypes.object,
};

export default connect(mapStateToProps, {
  fetch,
})(University);
