import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Search from 'material-ui/svg-icons/action/search';
import CompareIcon from 'material-ui/svg-icons/image/compare';
import LightbulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import NewsIcon from 'material-ui/svg-icons/av/fiber-new';
import QuestionIcon from 'material-ui/svg-icons/action/question-answer';
import ProfileBanner from '../components/ProfileBanner';

const styles = {
  root: {
    backgroundColor: '#424242',
  },
  menuItem: {
    color: '#757575',
  },
  selected: {
    backgroundColor: '#0091EA',
  },
};

class SideMenu extends Component {
  componentWillMount() {
    this.setState({ selected: 'search' });
    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  handleSelectItem(selected) {
    this.setState({ selected });
    this.context.router.push(`site/${selected}`);
  }

  render() {
    const { selected } = this.state;
    return (
      <Drawer
        containerClassName="side-menu"
        open

      >
        <div className="banner" />
        <ProfileBanner />
        <Menu
          menuItemStyle={styles.menuItem}
          selectedMenuItemStyle={styles.selected}
          value={this.state.selected}
          onChange={(e, val) => this.handleSelectItem(val)}
        >
          <MenuItem
            primaryText="Buscador"
            leftIcon={selected === 'search' ? <Search color="white" /> : <Search />}
            value="search"
          />
          <MenuItem
            primaryText="Comparador"
            leftIcon={selected === 'compare' ? <CompareIcon color="white" /> : <CompareIcon />}
            value="compare"
          />
          <MenuItem
            primaryText="Recomendaciones"
            leftIcon={selected === 'recomend' ? <LightbulbIcon color="white" /> : <LightbulbIcon />}
            value="recomend"
          />
          <MenuItem
            primaryText="Noticias"
            leftIcon={selected === 'news' ? <NewsIcon color="white" /> : <NewsIcon />}
            value="news"
          />
          <MenuItem
            primaryText="Newton"
            leftIcon={selected === 'newton' ? <QuestionIcon color="white" /> : <QuestionIcon />}
            value="newton"
          />
        </Menu>
      </Drawer>
    );
  }
}

SideMenu.contextTypes = {
  router: PropTypes.object,
};

export default SideMenu;
