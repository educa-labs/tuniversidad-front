import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import is from 'is_js';
import NavigationBar from '../components/NavigationBar';
import CareerCard from '../components/CareerCard';
import Loading from '../components/Loading';
import { fetch } from '../actions/fetch';
import { numeral } from '../helpers/numeral';

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
      solid: false,
    });
    this.handleSlideChange = this.handleSlideChange.bind(this);
    this.handleSubtitleClick = this.handleSubtitleClick.bind(this);
    this.getType = this.getType.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }


  handleSubtitleClick() {
    this.context.router.push(`site/university/${this.props.career.university_id}`);
  }

  handleScroll() {
    const pos = document.body.scrollTop;
    const limit = this.props.mobile ? 152 : 182;
    this.setState({ height: this.state.height - pos });
    console.log(pos);

    if (pos > limit) {
      if (!this.state.solid) this.setState({ solid: true });
    }
    if (pos <= limit) {
      if (this.state.solid) this.setState({ solid: false });
    }
  }

  getType() {
    const { career } = this.props;
    if (career.weighing.science !== 0 && career.weighing.history) return 'Historia o Ciencias';
    return career.weighing.science !== 0 ? 'Ciencias' : 'Historia';
  }

  handleSlideChange(value) {
    this.setState({ slideIndex: value });
  }

  render() {
    const { slideIndex, solid } = this.state;
    const { career, mobile } = this.props;
    if (is.any.null(career)) {
      return (
        <div className="fullscreen">
          <Loading />
        </div>
      );
    }
    const first = mobile ? (
      <div>
        <div className="career-section-header">Ponderación</div>
        <div className="career-section-body">
          <div className="row">
            <div className="expandible-label">Lenguaje</div>
            <div className="expandible-value">{career.weighing ? career.weighing.language : null}%</div>
          </div>
          <div className="row">
            <div className="expandible-label">Matemáticas</div>
            <div className="expandible-value">{career.weighing ? career.weighing.math : null}%</div>
          </div>
          <div className="row">
            <div className="expandible-label">{this.getType()}</div>
            <div className="expandible-value">{career.weighing ? career.weighing.science || career.weighing.history : null}%</div>
          </div>
          <div className="row">
            <div className="expandible-label">NEM</div>
            <div className="expandible-value">{career.weighing ? career.weighing.NEM : null}%</div>
          </div>
          <div className="row">
            <div className="expandible-label">Ranking</div>
            <div className="expandible-value">{career.weighing ? career.weighing.ranking : null}%</div>
          </div>
          <div className="row">
            <div className="expandible-label">Corte 2016</div>
            <div className="expandible-value">{career.last_cut}</div>
          </div>
        </div>
        <div className="career-section-header">Información</div>
        <div className="career-section-body">
          <div className="row">
            <div className="expandible-label">Área</div>
            <div className="expandible-value">{career.area_title ? career.area_title : 'No disponible'}</div>
          </div>
          <div className="row">
            <div className="expandible-label">Vacantes</div>
            <div className="expandible-value">{career.openings ? career.openings : 'No disponible'}</div>
          </div>
          <div className="row">
            <div className="expandible-label">Duración</div>
            <div className="expandible-value">{career.semesters ? career.semesters : 'No disponible'}</div>
          </div>
          <div className="row">
            <div className="expandible-label">Arancel</div>
            <div className="expandible-value">{career.price ? `$${numeral(career.price)}` : 'No disponible'}</div>
          </div>
          <div className="row">
            <div className="expandible-label">Sueldo promedio</div>
            <div className="expandible-value">{career.income ? `$${numeral(career.income)}` : 'No disponible'}</div>
          </div>
          <div className="row">
            <div className="expandible-label">Empleabilidad</div>
            <div className="expandible-value">{career.employability ? `${career.employability}%` : 'No disponible'}</div>
          </div>
        </div>
        <div className="career-section-header">Descripción</div>
        <div className="career-section-body career-description">
          {career.description}
        </div>
      </div>
    ) : <CareerCard career={career} detail mobile={mobile} />;

    return (
      <div className={`page page-university ${mobile ? 'page-university-mobile' : ''}`}>
        <NavigationBar location="site" title={`${career.title} en ${career.university_name}`} />
        <div className={`university-cover ${mobile ? 'university-cover-mobile' : 'university-cover-desk'} career-cover ${solid ? 'cover-solid' : ''}`}>
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
