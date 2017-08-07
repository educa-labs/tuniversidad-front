import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import InfiniteScroll from 'react-infinite-scroll-component';
import is from 'is_js';
import { getCareers, getCampus } from '../helpers/api';
import NavigationBar from '../components/NavigationBar';
import UniversityCard from '../components/UniversityCard';
import CareerCard from '../components/CareerCard';
import MapCard from '../components/MapCard';
import CareerHeading from '../components/CareerHeading';
import Loading from '../components/Loading';
import { fetch } from '../actions/fetch';
import '../styles/University.css';
import { numeral } from '../helpers/numeral';
import { getDate } from '../helpers/strings';


const tabStyle = {
  fontSize: '12px',
  fontWeight: 400,
};

class University extends Component {

  componentWillMount() {
    const { params, token } = this.props;
    this.props.fetch('university', params.id, token);
    this.setState({
      src: '',
      slideIndex: 0,
      careers: null,
      campus: null,
    });
    this.handleSlideChange = this.handleSlideChange.bind(this);
    this.getContent = this.getContent.bind(this);
    getCareers(this.props.params.id, this.props.token)
      .then(res => this.setState({ careers: res.body }))
      .catch(err => this.setState({ careers: err.body }));

    getCampus(this.props.params.id, this.props.token)
      .then(res => this.setState({ campus: res.body }))
      .catch(err => this.setState({ campus: err.body }));
  }

  getContent(slideIndex) {
    const { mobile, university } = this.props;
    switch (slideIndex) {
      case 0:
        return mobile ? (
          <div>
            <div className="career-section-header">Información</div>
            <div className="career-section-body">
              <div className="row">
                <div className="expandible-label">Tipo</div>
                <div className="expandible-value">{university.u_type}</div>
              </div>
              <div className="row">
                <div className="expandible-label">Sigla</div>
                <div className="expandible-value">{university.initials}</div>
              </div>
              <div className="row">
                <div className="expandible-label">Gratuidad</div>
                <div className="expandible-value">{university.freeness ? 'Sí' : 'No'}</div>
              </div>
              <div className="row">
                <div className="expandible-label">Fundación</div>
                <div className="expandible-value">{getDate(university.foundation)}</div>
              </div>
              <div className="row">
                <div className="expandible-label">Alumnos</div>
                <div className="expandible-value">{university.students ? numeral(university.students) : 'No disponible'}</div>
              </div>
              <div className="row">
                <div className="expandible-label">Profesores</div>
                <div className="expandible-value">{university.teachers ? numeral(university.teachers) : 'No disponible'}</div>
              </div>
              <div className="row">
                <div className="expandible-label">Grados</div>
                <div className="expandible-value">{university.degrees ? numeral(university.degrees) : 'No disponible'}</div>
              </div>
              <div className="row">
                <div className="expandible-label">Postgrados</div>
                <div className="expandible-value">{university.postgraduates ? numeral(university.postgraduates) : 'No disponible'}</div>
              </div>
              <div className="row">
                <div className="expandible-label">Doctorados</div>
                <div className="expandible-value">{university.doctorates ? numeral(university.doctorates) : 'No disponible'}</div>
              </div>
            </div>
            <div className="career-section-header">Descripción</div>
            <div className="career-section-body career-description">
              {university.description}
            </div>
          </div>
        ) : (
          <div>
            <UniversityCard
              university={this.props.university}
              detail
              mobile={this.props.mobile}
            />
            {this.state.campus.map(campus => (
              <MapCard campus={campus} mobile={this.props.mobile} key={campus.id} />
            ))}
          </div>
        );
      case 1:
        return (
          <InfiniteScroll pageStart={0}>
            {this.state.careers.map((res) => {
              if (this.props.mobile) {
                return (
                  <CareerHeading
                    key={res.id}
                    mobile={this.props.mobile}
                    title={res.title}
                    subtitle={`${res.university_name} en ${res.campu_name}`}
                    onClick={() => this.context.router.push(`site/career/${res.id}`)}
                  />
                );
              }
              return <CareerCard career={res} key={res.id} />;
            })}
          </InfiniteScroll>
        );
      default: return null;
    }
  }
  handleSlideChange(value) {
    this.setState({ slideIndex: value });
  }

  render() {
    const { careers, slideIndex, campus } = this.state;
    const { university, mobile } = this.props;

    if (is.any.null(university, careers, campus)) {
      return (
        <div className="fullscreen">
          <Loading />
        </div>
      );
    }
    return (
      <div className={`page page-university ${mobile ? 'page-university-mobile' : ''}`}>
        <NavigationBar location="site" title={university.title} />
        <div className={`university-cover ${mobile ? 'university-cover-mobile' : 'university-cover-desk'}`}>
          <div>
            <div className="university-cover__title">{university.title}</div>
            <div className="university-cover__subtitle">{university.motto}</div>
          </div>
        </div>
        <Tabs
          onChange={this.handleSlideChange}
          value={slideIndex}
          className={`tabs-search ${mobile ? 'tabs-search-mobile' : 'tabs-search-desktop'}`}
        >
          <Tab label="Información general" value={0} style={tabStyle} />
          <Tab label="Carreras" value={1} style={tabStyle} />
        </Tabs >
        {this.getContent(slideIndex)}
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

University.defaultProps = {
  mobile: false,
};

University.propTypes = {
  fetch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  params: PropTypes.object,
  university: PropTypes.object,
  mobile: PropTypes.bool,
};

University.contextTypes = {
  router: PropTypes.object,
};


export default connect(mapStateToProps, {
  fetch,
})(University);
