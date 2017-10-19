import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import Search from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import LightbulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import NewsIcon from 'material-ui/svg-icons/av/fiber-new';
import ProfileBanner from '../components/ProfileBanner';
import { clearUser } from '../helpers/storage';
import { clearState } from '../actions/user';
import { selectTab } from '../actions/profile';


class SideMenu extends Component {
  componentWillMount() {
    if (this.context.router.location.pathname === '/site') {
      this.setState({ selected: 'search' });
    } else {
      this.setState({ selected: this.context.router.routes[2].path });
    }
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.clearState();
    clearUser();
    this.context.router.replace('/search');
  }

  handleSelectItem(selected) {
    if (this.props.mobile) this.props.onRequestChange(false);
    this.setState({ selected });
    this.context.router.push(`site/${selected}`);
  }

  render() {
    const { selected } = this.state;
    const { mobile } = this.props;
    const logoBanner = (
      <div className="side-menu-header">
        <div className="logo-tuni" />
      </div>
    );
    return (
      <Drawer
        docked={!mobile}
        width={230}
        open={this.props.open}
        onRequestChange={this.props.onRequestChange}
        containerClassName="side-menu"
        disableSwipeToOpen={this.props.currentTab === 2 && selected === 'profile'}
        containerStyle={{
          backgroundColor: '#424242',
          minHeight: '32rem',
          zIndex: 5,
        }}
        overlayStyle={{
          zIndex: 4,
        }}
      >
        {mobile ? null : logoBanner}
        <ProfileBanner
          user={this.props.user}
          onClick={() => {
            this.handleSelectItem('profile');
          }}
          selected={selected === 'profile'}
        />
        <button
          className={`side-menu__item ${selected === 'search' ? 'side-menu__item_selected' : ''}`}
          onClick={() => this.handleSelectItem('search')}
        >
          <div className="icon" ><Search color="#FFFFFF" /></div>
          <div className="side-menu__item-label">Buscador</div>
        </button>
        <button
          className={`side-menu__item ${selected === 'recommend' ? 'side-menu__item_selected' : ''}`}
          onClick={() => {
            this.props.selectTab(2);
            this.handleSelectItem('profile');
          }}
        >
          <div className="icon"><LightbulbIcon color="#FFFFFF" /></div>
          <div className="side-menu__item-label">Newton (Pronto)</div>
        </button>
        <button
          className={`side-menu__item ${selected === 'news' ? 'side-menu__item_selected' : ''}`}
          onClick={() => this.handleSelectItem('news')}
        >
          <div className="icon" ><NewsIcon color="#FFFFFF" /></div>
          <div className="side-menu__item-label">Noticias</div>
        </button>
        <div className="side-menu-exit-button">
          <IconButton onTouchTap={this.handleLogout}>
            <Exit color="#C9C9C9" />
          </IconButton>
        </div>
      </Drawer >
    );
  }
}

SideMenu.defaultProps = {
  mobile: false,
};

SideMenu.propTypes = {
  mobile: PropTypes.bool.isRequired,
  selectTab: PropTypes.func.isRequired,
};

SideMenu.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.user.currentUser,
    currentTab: state.profileNavigation.tab,
  };
}

export default connect(mapStateToProps, {
  clearState,
  selectTab,
})(SideMenu);
