import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Search from 'material-ui/svg-icons/action/search';
import CompareIcon from 'material-ui/svg-icons/image/compare';
import LightbulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import NewsIcon from 'material-ui/svg-icons/av/fiber-new';
import QuestionIcon from 'material-ui/svg-icons/action/question-answer';

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
    return (
      <Drawer containerClassName="side-menu" open>
        <div className="banner" />
        <Menu
          style={styles.root}
          menuItemStyle={styles.menuItem}
          selectedMenuItemStyle={styles.selected}
          value={this.state.selected}
          onChange={(e, val) => this.handleSelectItem(val)}
        >
          <MenuItem
            primaryText="Buscador"
            leftIcon={<Search />}
            value="search"
          />
          <MenuItem
            primaryText="Comparador"
            leftIcon={<CompareIcon />}
            value="compare"
          />
          <MenuItem
            primaryText="Recomendaciones"
            leftIcon={<LightbulbIcon />}
            value="recomend"
          />
          <MenuItem
            primaryText="Noticias"
            leftIcon={<NewsIcon />}
            value="news"
          />
          <MenuItem
            primaryText="Newton"
            leftIcon={<QuestionIcon />}
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
