import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import Message from 'material-ui/svg-icons/communication/message';
import ProfileIcon from 'material-ui/svg-icons/action/account-circle';
import '../styles/MenuBar.css';

const newtonStyle = {
  color: '#0091EA',
  textTransform: 'none',
};

function MenuBar(props, context) {
  return (
    <div className={`menubar-container ${context.router.location.pathname === '/' ? 'hide' : ''}`}>
      <Tabs
        contentContainerClassName="tabs"
      >
        <Tab label="buscador" value="search" onClick={() => context.router.push('search')} />
        <Tab label="comparador" value="compare" onClick={() => context.router.push('compare')} />
        <Tab label="recomendaciones" value="suggests" onClick={() => context.router.push('suggests')} />
        <Tab label="noticias" value="news" onClick={() => context.router.push('news')} />
        <Tab label="NEWTHON (alpha)" buttonStyle={newtonStyle} value="newton" onClick={() => context.router.push('newton')} />
      </Tabs>
      <div className="menu">
        <IconButton>
          <Message color="#C3C3C3" />
        </IconButton>
        <IconButton>
          <ProfileIcon color="#C3C3C3" />
        </IconButton>
      </div>
    </div>
  );
}

MenuBar.contextTypes = {
  router: PropTypes.object,
};


export default MenuBar;
