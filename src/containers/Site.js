import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SideMenu from './SideMenu';
import { getGoals } from '../actions/goals';
import '../styles/Site.css';


class Site extends Component {
  componentDidMount() {
    this.props.getGoals(this.props.token);
  }

  render() {
    return (
      <div className="site">
        <SideMenu />
        {this.props.children}
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
};

function mapStateToProps(state) {
  return {
    token: state.user.currentUser.auth_token,
    requesting: state.goals.requesting,
  };
}

export default connect(mapStateToProps, {
  getGoals,
})(Site);
