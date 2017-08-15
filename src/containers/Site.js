import React, { PropTypes, Component, cloneElement } from 'react';
import MediaQuery from 'react-responsive';
import is from 'is_js';
import { connect } from 'react-redux';
import SideMenu from './SideMenu';
import SideBar from './SideBar';
import { getGoals } from '../actions/goals';
import { fetch } from '../actions/fetch';
import { getMostPopular } from '../actions/search';
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
    const { user } = this.props;
    const token = user.auth_token;
    if (user.nem !== null && user.ranking !== null) {
      if (is.null(this.props.goals)) this.props.getGoals(token);
    }
    if (is.not.existy(user)) this.context.router.replace('/');
    if (is.empty(this.props.popularCareers)) this.props.getMostPopular('carreers', token);
    if (is.empty(this.props.popularUniv)) this.props.getMostPopular('universities', token);
    if (is.null(this.props.regions)) this.props.fetch('regions', null, token);
  }

  render() {
    return (
      <div className="queries">
        <MediaQuery maxDeviceWidth={720} className="site">
          <SideBar
            user={this.props.user}
            mobile
            open={this.state.showMenu}
            shadow={false}
            onSetOpen={open => this.setState({ showMenu: open })}
          />
          {cloneElement(this.props.children, {
            mobile: true,
            toggleMenu: () => this.setState({ showMenu: !this.state.showMenu }),
          }) }
        </MediaQuery>
        <MediaQuery minDeviceWidth={721} className="site">
          <SideBar
            user={this.props.user}
            docked
            open={false}
          />
          {this.props.children}
        </MediaQuery>
      </div>
    );
  }
}

Site.defaultProps = {
  children: null,
};

Site.contextTypes = {
  router: PropTypes.object,
};

Site.propTypes = {
  children: PropTypes.node,
  getGoals: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  getMostPopular: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user.currentUser,
    active: state.filter.active,
    popularCareers: state.search.popular_careers,
    popularUniv: state.search.popular_univ,
    regions: state.fetch.regions,
    goals: state.goals.goals,
  };
}

export default connect(mapStateToProps, {
  fetch,
  getGoals,
  getMostPopular,
})(Site);
