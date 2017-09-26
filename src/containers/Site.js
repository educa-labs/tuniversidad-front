import React, { PropTypes, Component, cloneElement } from 'react';
import MediaQuery from 'react-responsive';
import is from 'is_js';
import { connect } from 'react-redux';
import SideMenu from './SideMenu';
import { getGoals } from '../actions/goals';
import { fetch } from '../actions/fetch';
import { getMostPopular } from '../actions/search';
import { getNews } from '../actions/news';
import '../styles/SideMenu.css';
import '../styles/GeneralCard.css';


class Site extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  componentDidMount() {
    const { token } = this.props;
    if (is.null(token)) {
      this.context.router.replace('/search');
    } else {
      if (is.null(this.props.goals)) this.props.getGoals(token);
      if (is.null(this.props.universities)) this.props.fetch('universities', null, token);
      if (is.null(this.props.news)) this.props.getNews(token);
    }
  }

  render() {
    return (
      <div className="queries">
        <MediaQuery maxDeviceWidth={720} className="site">
          <SideMenu
            mobile
            open={this.state.showMenu}
            onRequestChange={open => this.setState({ showMenu: open })}
          />
          {cloneElement(this.props.children, {
            mobile: true,
            toggleMenu: () => this.setState({ showMenu: !this.state.showMenu }),
          }) }
        </MediaQuery>
        <MediaQuery minDeviceWidth={721} className="site">
          <SideMenu open />
          {this.props.children}
        </MediaQuery>
      </div>
    );
  }
}

Site.defaultProps = {
  children: null,
  token: null,
};

Site.contextTypes = {
  router: PropTypes.object,
};

Site.propTypes = {
  children: PropTypes.node,
  getGoals: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  token: PropTypes.string,
  getMostPopular: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.user.currentUser ? state.user.currentUser.auth_token : null,
    active: state.filter.active,
    popularCareers: state.search.popular_careers,
    popularUniv: state.search.popular_univ,
    regions: state.fetch.regions,
    universities: state.fetch.universities,
    goals: state.goals.goals,
    news: state.news.news,
  };
}

export default connect(mapStateToProps, {
  fetch,
  getGoals,
  getMostPopular,
  getNews,
})(Site);
