import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import InfiniteScroll from 'react-infinite-scroll-component';
import is from 'is_js';
import NavigationBar from '../components/NavigationBar';
import ExpandibleCard from '../components/ExpandibleCard';
import CareerHeading from '../components/CareerHeading';
import Loading from '../components/Loading';
import { fetch } from '../actions/fetch';
import '../styles/University.css';
import { getCareers, getCampus, getCover } from '../helpers/api';
import Description from '../components/university/DescriptionCard';
import Info from '../components/university/UniversityInfo';
import InfoMobile from '../components/university/UniversityInfoMobile';
import Grid from '../components/utility/Grid';
import CareerCampus from '../components/university/CareerCampus';
import { GUEST, SITE } from '../constants/strings';

const tabStyle = {
  fontSize: '12px',
  fontWeight: 400,
};

const getLocation = (path) => {
  if (path.indexOf('site') > -1) return SITE;
  return GUEST;
};


class University extends Component {

  componentWillMount() {
    const { params, token } = this.props;
    this.props.fetch('university', params.id, token);
    this.setState({
      cover: null,
      logo: null,
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

    getCover(this.props.params.id, this.props.token)
      .then(res => this.setState({ cover: res.body.cover, logo: res.body.profile }))
      .catch(err => this.setState({ cover: err.body }));
  }

  getContent(slideIndex) {
    const { mobile, university } = this.props;
    const guest = getLocation(this.props.location.pathname);
    const mapCards = this.state.campus.map(campus => (
      <CareerCampus campus={campus} mobile={this.props.mobile} key={campus.id} />
    ));
    const deskContent = [
      <Description text={university.description} />,
      <Info university={university} />,
    ].concat(mapCards);
    const mobileContent = [
      <InfoMobile university={university} key={1} />,
    ];

    switch (slideIndex) {
      case 0:
        return (
          <Grid columns={2} mobile={mobile}>
            {mobile ? mobileContent : deskContent}
          </Grid>
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
                    onClick={() => this.context.router.push(`${guest ? '' : 'site'}/career/${res.id}`)}
                  />
                );
              }
              return <ExpandibleCard career={res} key={res.id} guest={guest} />;
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
    console.log(this.state);
    const { careers, slideIndex, campus, cover, logo } = this.state;
    const { university, mobile } = this.props;
    const guest = getLocation(this.props.location.pathname);

    if (!is.all.existy(university, careers, campus, cover, logo)) {
      return (
        <div className="fullscreen">
          <Loading />
        </div>
      );
    }
    console.log('Entramos', this.state);
    return (
      <div className={`page page-university ${guest ? 'page-guest' : ''} ${mobile ? 'page-university-mobile' : ''}`}>
        <NavigationBar location="site" guest={guest} />
        <div style={{ backgroundImage: `url(${cover})` }} className={`university-cover ${guest ? 'university-cover-guest' : ''} ${mobile ? 'university-cover-mobile' : 'university-cover-desk'}`}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="university-logo" style={{ backgroundImage: `url(${logo})` }} />
            <div className="col">
              <div className="university-cover__title">{university.title}</div>
              <div className="university-cover__subtitle">{university.motto}</div>
            </div>
          </div>
        </div>
        <Tabs
          onChange={this.handleSlideChange}
          value={slideIndex}
          className={`tabs-search ${guest ? 'tabs-search-guest' : ''} ${mobile ? 'tabs-search-mobile' : 'tabs-search-desktop'}`}
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
    token: state.user.currentUser ? state.user.currentUser.auth_token : null,
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
