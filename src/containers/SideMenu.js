import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Search from 'material-ui/svg-icons/action/search';
import CompareIcon from 'material-ui/svg-icons/image/compare';
import LightbulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import NewsIcon from 'material-ui/svg-icons/av/fiber-new';
import QuestionIcon from 'material-ui/svg-icons/action/question-answer';
import FlatButton from 'material-ui/FlatButton';
import ProfileBanner from '../components/ProfileBanner';

const styles = {
  style: {
    width: '256px',
    padding: '0',
  },
  menuItem: {
    color: '#757575',
  },
  selected: {
    backgroundColor: '#0091EA',
    color: 'white',
  },
};

class SideMenu extends Component {
  componentWillMount() {
    this.setState({ selected: 'search' });
    if (this.context.router.location.pathname === '/site/') {
      this.setState({ selected: 'search' });
    } else {
      this.setState({ selected: this.context.router.routes[2].path });
    }
    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  handleSelectItem(selected) {
    this.setState({ selected });
    this.context.router.push(`site/${selected}`);
  }

  render() {
    const { selected } = this.state;


    return (
      <div className="side-menu">
        <div className="side-menu__banner" />
        <ProfileBanner user={this.props.user} />
        <div
          className={`side-menu__item ${selected === 'search' ? 'side-menu__item_selected' : ''}`}
          onClick={() => this.handleSelectItem('search')}
        >
          <div className="icon" ><Search color="white" /></div>
          <div className="label">Buscador</div>
        </div>
        <div
          className={`side-menu__item ${selected === 'compare' ? 'side-menu__item_selected' : ''}`}
          onClick={() => this.handleSelectItem('compare')}
        >
          <div className="icon" ><CompareIcon color="white" /></div>
          <div className="label">Comparador</div>
        </div>
        <div
          className={`side-menu__item ${selected === 'recommend' ? 'side-menu__item_selected' : ''}`}
          onClick={() => this.handleSelectItem('recommend')}
        >
          <div className="icon" ><LightbulbIcon color="white" /></div>
          <div className="label">Comparador</div>
        </div>
        <div
          className={`side-menu__item ${selected === 'news' ? 'side-menu__item_selected' : ''}`}
          onClick={() => this.handleSelectItem('news')}
        >
          <div className="icon" ><NewsIcon color="white" /></div>
          <div className="label">Comparador</div>
        </div>
        
        
        {/*<Menu
          autoWidth
          menuItemStyle={styles.menuItem}
          listStyle={styles.style}
          selectedMenuItemStyle={styles.selected}
          width="256"
          style={styles.style}
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
        </Menu>*/}
      </div>
    );
  }
}

SideMenu.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.user.currentUser,
  };
}

export default connect(mapStateToProps)(SideMenu);
