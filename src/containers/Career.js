import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import is from 'is_js';
import NavigationBar from '../components/NavigationBar';
import CareerCard from '../components/CareerCard';
import Loading from '../components/Loading';
import { fetch } from '../actions/fetch';

const tabStyle = {
  fontSize: '12px',
  fontWeight: 400,
};

class Career extends Component {
  componentWillMount() {
    const { params, token } = this.props;
    this.props.fetch('career', params.id, token);
    this.setState({
      src: '',
      slideIndex: 0,
    });
    this.handleSlideChange = this.handleSlideChange.bind(this);
    this.handleSubtitleClick = this.handleSubtitleClick.bind(this);
  }

  handleSlideChange(value) {
    this.setState({ slideIndex: value });
  }

  handleSubtitleClick() {
    this.context.router.push(`site/university/${this.props.career.university_id}`);
  }

  render() {
    const { slideIndex } = this.state;
    const { career, mobile } = this.props;
    if (is.any.null(career)) {
      return (
        <div className="fullscreen">
          <Loading />
        </div>
      );
    }
    const first = <CareerCard career={career} detail mobile={mobile} />;

    return (
      <div className={`page page-university ${mobile ? 'page-university-mobile' : ''}`}>
        <NavigationBar location="site" title={`${career.title} en ${career.university_name}`} />
        <div className={`university-cover ${mobile ? 'university-cover-mobile' : 'university-cover-desk'} career-cover`}>
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
          className={`tabs-search ${mobile ? 'tabs-search-mobile' : 'tabs-search-desktop'}`}
        >
          <Tab label="Información general" value={0} style={tabStyle} />
          <Tab label="Preguntas y respuestas" value={1} style={tabStyle} />
        </Tabs >
        {slideIndex === 0 ? first : null }
        {slideIndex === 1 ? <div>Preguntas</div> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.currentUser.auth_token,
    career: state.fetch.career,
  };
}

Career.propTypes = {
  fetch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  params: PropTypes.object,
  career: PropTypes.object,
};

Career.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps, {
  fetch,
})(Career);
