import React, { PropTypes, Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import SideMenu from './SideMenu';
import { getGoals } from '../actions/goals';
import { fetch } from '../actions/fetch';
import '../styles/Site.css';
import '../styles/GeneralCard.css';


class Site extends Component {
  componentDidMount() {
    this.props.getGoals(this.props.token);
    this.props.fetch('regions', null, this.props.token);
  }

  render() {
    return (
      <div className="site">
        <SideMenu mobile />
        {cloneElement(this.props.children, { mobile: true }) }
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
};

function mapStateToProps(state) {
  return {
    token: state.user.currentUser.auth_token,
  };
}

export default connect(mapStateToProps, {
  fetch,
  getGoals,
})(Site);
