import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import Message from 'material-ui/svg-icons/communication/message';
import ProfileIcon from 'material-ui/svg-icons/action/account-circle';
import { changeView } from '../actions/view';
import '../styles/MenuBar.css';

const newtonStyle = {
  color: '#0091EA',
  textTransform: 'none',
};

function MenuBar(props) {
  return (
    <div className="menubar-container">
      <Tabs
        contentContainerClassName="tabs"
        value={props.view}
        onChange={value => props.changeView(value)}
      >
        <Tab label="buscador" value={1} />
        <Tab label="comparador" value={2} />
        <Tab label="recomendaciones" value={3} />
        <Tab label="noticias" value={4} />
        <Tab label="NEWTHON (alpha)" buttonStyle={newtonStyle} value={5} />
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

MenuBar.propTypes = {
  view: PropTypes.number.isRequired,
  changeView: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    view: state.view.view,
  };
}

export default connect(mapStateToProps, {
  changeView,
})(MenuBar);
