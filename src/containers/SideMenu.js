import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import Search from 'material-ui/svg-icons/action/search';
import RaisedButton from 'material-ui/RaisedButton';
import CompareIcon from 'material-ui/svg-icons/image/compare';
import LightbulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import NewsIcon from 'material-ui/svg-icons/av/fiber-new';
import ProfileBanner from '../components/ProfileBanner';
import { clearUser } from '../helpers/storage';
import { clearState } from '../actions/user';


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
    this.context.router.replace('/');
  }

  handleSelectItem(selected) {
    if (this.props.mobile) this.props.onRequestChange(false);
    this.setState({ selected });
    this.context.router.push(`site/${selected}`);
  }

  render() {
    const { selected } = this.state;
    const { mobile } = this.props;
    return (
      <Drawer
        docked={!mobile}
        width={230}
        open={this.props.open}
        onRequestChange={this.props.onRequestChange}
        containerClassName="side-menu"
        containerStyle={{
          backgroundColor: '#424242',
          minHeight: '32rem',
        }}
      >
        {mobile ? null : <div className="side-menu__banner" />}
        <ProfileBanner
          user={this.props.user}
          onClick={() => this.handleSelectItem('profile')}
          selected={selected === 'profile'}
        />
        <div
          className={`side-menu__item ${selected === 'search' ? 'side-menu__item_selected' : ''}`}
          onClick={() => this.handleSelectItem('search')}
        >
          <div className="icon" ><Search color="#FFFFFF" /></div>
          <div className="label">Buscador</div>
        </div>
        <div
          className={`side-menu__item ${selected === 'compare' ? 'side-menu__item_selected' : ''}`}
          onClick={() => this.handleSelectItem('compare')}
        >
          <div className="icon" ><CompareIcon color="#FFFFFF" /></div>
          <div className="label">Comparador</div>
        </div>
        <div
          className={`side-menu__item ${selected === 'recommend' ? 'side-menu__item_selected' : ''}`}
          onClick={() => this.handleSelectItem('recommend')}
        >
          <div className="icon" ><LightbulbIcon color="#FFFFFF" /></div>
          <div className="label">Recomendaciones</div>
        </div>
        <div
          className={`side-menu__item ${selected === 'news' ? 'side-menu__item_selected' : ''}`}
          onClick={() => this.handleSelectItem('news')}
        >
          <div className="icon" ><NewsIcon color="#FFFFFF" /></div>
          <div className="label">Noticias</div>
        </div>
        <div className="side-menu__button-container">
          <RaisedButton
            onTouchTap={this.handleLogout}
            label="Cerrar sesión"
            backgroundColor="#0091EA"
            labelColor="#FFFFFF"
          />
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
};

SideMenu.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.user.currentUser,
  };
}

export default connect(mapStateToProps, {
  clearState,
})(SideMenu);
