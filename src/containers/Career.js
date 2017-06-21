import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import is from 'is_js';
import NavigationBar from '../components/NavigationBar';
import CareerCard from '../components/CareerCard';
import { fetch } from '../actions/fetch';

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
    const { career } = this.props;
    if (is.any.null(career)) {
      return (
        <div>
          Cargando ...
        </div>
      );
    }
    return (
      <div className="university">
        <NavigationBar location="site" title={career.title} />
        <div className="university-cover">
          <div className="university-cover__title">{career.title}</div>
          <div
            className="university-cover__subtitle"
            onClick={this.handleSubtitleClick}
          >
            {career.university_name}
          </div>
        </div>
        <div className="tabs-container">
          <Tabs
            onChange={this.handleSlideChange}
            value={slideIndex}
            className="tabs"
          >
            <Tab label="Información general" value={0} />
            <Tab label="Malla" value={1} />
            <Tab label="Preguntas y respuestas" value={2} />
          </Tabs >
        </div>
        <div className="university-children">
          {slideIndex === 0 ? <CareerCard career={career} detail /> : null }
          {slideIndex === 1 ? <div>Malla</div> : null}
          {slideIndex === 2 ? <div>Preguntas</div> : null}
        </div>
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
