import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import InfiniteScroll from 'react-infinite-scroll-component';
import is from 'is_js';
import { getCareers } from '../helpers/api';
import NavigationBar from '../components/NavigationBar';
import UniversityCard from '../components/UniversityCard';
import CareerCard from '../components/CareerCard';
// import ExpandibleCard from '../components/ExpandibleCard';
import CareerHeading from '../components/CareerHeading';
import Loading from '../components/Loading';
import { fetch } from '../actions/fetch';
import '../styles/University.css';


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
    });
    this.handleSlideChange = this.handleSlideChange.bind(this);
    this.getContent = this.getContent.bind(this);
    getCareers(this.props.params.id, this.props.token)
      .then(res => this.setState({ careers: res.body }))
      .catch(err => this.setState({ careers: err.body }));
  }

  getContent(slideIndex) {
    switch (slideIndex) {
      case 0:
        return (
          <UniversityCard
            university={this.props.university}
            detail
            mobile={this.props.mobile}
          />
        );
      case 1:
        return (
          <InfiniteScroll
            pageStart={0}
            height={this.props.mobile ? 280 : 440}
          >
            {this.state.careers.map((res) => {
              if (this.props.mobile) {
                return (
                  <CareerHeading
                    key={res.id}
                    mobile={this.props.mobile}
                    title={res.title}
                    subtitle={res.university_name}
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
    const { careers, slideIndex } = this.state;
    const { university, mobile } = this.props;

    if (is.any.null(university, careers)) {
      return (
        <div className="fullscreen">
          <Loading />
        </div>
      );
    }
    return (
      <div className="site__children">
        <NavigationBar location="site" title={university.title} />
        <div className="university-cover">
          <div>
            <div className="university-cover__title">{university.title}</div>
            <div className="university-cover__subtitle">{university.motto}</div>
          </div>
        </div>
        <Tabs
          onChange={this.handleSlideChange}
          value={slideIndex}
          className={`tabs-search ${mobile ? '' : 'tabs-search-dektop'}`}
        >
          <Tab label="Información general" value={0} style={tabStyle} />
          <Tab label="Carreras" value={1} style={tabStyle} />
        </Tabs >
        <div className={`col justify-center bg-grey ${mobile ? '' : 'padding-7'}`}>
          {this.getContent(slideIndex)}
        </div>
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
