import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import InfiniteScroll from 'react-infinite-scroll-component';
import is from 'is_js';
import NavigationBar from '../components/NavigationBar';
import Loading from '../components/Loading';
import ExpandibleCard from '../components/ExpandibleCard';
import CareerHeading from '../components/CareerHeading';
import { fetch } from '../actions/fetch';
import { getCareerCover, getCareerCampus, getSimilarCareers } from '../helpers/api';
import Description from '../components/university/DescriptionCard';
import Info from '../components/university/CareerInfo';
import InfoMobile from '../components/university/CareerInfoMobile';
import Grid from '../components/utility/Grid';
import Campus from '../components/university/CareerCampus';
import { GUEST, SITE } from '../constants/strings';

const tabStyle = {
  fontSize: '12px',
  fontWeight: 400,
};

const getLocation = (path) => {
  if (path.indexOf('site') > -1) return SITE;
  return GUEST;
};

class Career extends Component {
  componentWillMount() {
    const { params, token } = this.props;
    this.props.fetch('career', params.id, token);
    this.setState({
      cover: null,
      campus: null,
      slideIndex: 0,
      similar: [],
    });
    this.getContent = this.getContent.bind(this);
    this.handleSlideChange = this.handleSlideChange.bind(this);
    this.handleSubtitleClick = this.handleSubtitleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.career !== nextProps.career) {
      if (is.not.null(nextProps.career)) {
        getCareerCover(nextProps.career.area_id)
          .then(res => this.setState({ cover: res.body.image }))
          .catch(err => this.setState({ cover: err.body }));
        getCareerCampus(nextProps.career.campu_id, nextProps.token)
          .then(res => this.setState({ campus: res.body }))
          .catch(err => this.setState({ campus: err.body }));
        getSimilarCareers(nextProps.career.id)
          .then(res => this.setState({ similar: res.body }))
          .catch(err => this.setState({ err: err.body }));
      }
    }
  }

  handleSlideChange(value) {
    this.setState({ slideIndex: value });
  }

  handleSubtitleClick() {
    this.context.router.push(`site/university/${this.props.career.university_id}`);
  }

  getContent(slideIndex) {
    const { mobile, career } = this.props;
    const guest = getLocation(this.props.location.pathname) === GUEST;
    switch (slideIndex) {
      case 0:
        return mobile ? <InfoMobile career={career} /> : (
          <Grid columns={2}>
            <Description text={career.description} />
            <Info career={career} />
            {this.state.campus ? <Campus campus={this.state.campus} /> : <Loading />}
          </Grid>
        );
      case 1:
        return (
          <InfiniteScroll pageStart={0}>
            {this.state.similar.map((res) => {
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

  render() {
    const { slideIndex, cover } = this.state;
    const { career, mobile } = this.props;
    const guest = getLocation(this.props.location.pathname) === GUEST;
    if (is.null(career)) {
      return (
        <div className="fullscreen">
          <Loading />
        </div>
      );
    }

    return (
      <div className={`page ${guest ? 'page-guest' : ''} page-university ${mobile ? 'page-university-mobile' : ''}`}>
        <NavigationBar location="site" guest={guest} />
        <div style={{ backgroundImage: `url(${cover})` }} className={`university-cover ${guest ? 'university-cover-guest' : ''} ${mobile ? 'university-cover-mobile' : 'university-cover-desk'}`}>
          <div className="university-cover__title">{career.title}</div>
          <div
            className="university-cover__subtitle"
            onClick={this.handleSubtitleClick}
          >
            {career.university_name}
          </div>
        </div>
        <Tabs
          onChange={this.handleSlideChange}
          value={slideIndex}
          className={`tabs-search ${guest ? 'tabs-search-guest' : ''} ${mobile ? 'tabs-search-mobile' : 'tabs-search-desktop'}`}
        >
          <Tab label="Información general" value={0} style={tabStyle} />
          <Tab label="Carreras similares" value={1} style={tabStyle} />
        </Tabs >
        {this.getContent(slideIndex)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.currentUser ? state.user.currentUser.auth_token : null,
    career: state.fetch.career,
  };
}

Career.defaultProps = {
  mobile: false,
};

Career.propTypes = {
  fetch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  mobile: PropTypes.bool,
  params: PropTypes.object,
  career: PropTypes.object,
};

Career.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps, {
  fetch,
})(Career);
