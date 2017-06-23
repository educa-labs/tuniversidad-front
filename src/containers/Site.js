import React, { PropTypes, Component, cloneElement } from 'react';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import SideMenu from './SideMenu';
import { getGoals } from '../actions/goals';
import { fetch } from '../actions/fetch';
import { getMostPopular } from '../actions/search';
import '../styles/Site.css';
import '../styles/GeneralCard.css';


class Site extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  componentDidMount() {
    this.props.getGoals(this.props.token);
    this.props.getMostPopular(this.props.active, this.props.token);
    this.props.fetch('regions', null, this.props.token);
  }

  render() {
    return (
      <div>
        <MediaQuery maxDeviceWidth={720}>
          <div className="site">
            <SideMenu
              mobile
              open={this.state.showMenu}
              onRequestChange={open => this.setState({ showMenu: open })}
            />
            {cloneElement(this.props.children, {
              mobile: true,
              toggleMenu: () => this.setState({ showMenu: !this.state.showMenu }),
            }) }
          </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={721}>
          <div className="site">
            <SideMenu open />
            <div className="empty" />
            {this.props.children}
          </div>
        </MediaQuery>
      </div>
    );
  }
}

Site.defaultProps = {
  children: null,
};

Site.propTypes = {
  children: PropTypes.node,
  getGoals: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
  getMostPopular: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.user.currentUser.auth_token,
    active: state.filter.active,
  };
}

export default connect(mapStateToProps, {
  fetch,
  getGoals,
  getMostPopular,
})(Site);
