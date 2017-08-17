import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from 'react-sidebar';
import Search from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import LightbulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import NewsIcon from 'material-ui/svg-icons/av/fiber-new';
import ProfileBanner from '../components/ProfileBanner';
import { clearUser } from '../helpers/storage';
import { clearState } from '../actions/user';
import { selectTab } from '../actions/profile';

const sidebarStyles = {
  sidebar: {
    zIndex: 4,
    position: 'fixed',
    width: '230px',
    backgroundColor: '#424242',
    display: 'flex',
    flexDirection: 'column',
  },
  overlay: {
    zIndex: 3,
  },
  root: {
  },
};

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'search',
    };
  }

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
    this.context.router.replace('/login');
  }

  handleSelectItem(selected) {
    if (this.props.mobile) this.props.onSetOpen(false);
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
  
    const sidebarContent = (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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
      </div>
    );
    return (
      <Sidebar
        sidebar={sidebarContent}
        styles={sidebarStyles}
        {...this.props}
      >
      </Sidebar>
    );
  }
}

SideMenu.defaultProps = {
  mobile: false,
};

SideMenu.propTypes = {
  mobile: PropTypes.bool.isRequired,
};

SideMenu.contextTypes = {
  router: PropTypes.object,
};


export default connect(null, {
  clearState,
  selectTab,
})(SideMenu);

