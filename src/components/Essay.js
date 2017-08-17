import React, { PropTypes, Component } from 'react';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import is from 'is_js';
import { Collapse } from 'react-collapse';
import Loading from './Loading';


class Essay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
    this.renderEssay = this.renderEssay.bind(this);
  }

  renderEssay(ess) {
    return (
      <div className="row align-center row-hover" onClick={() => console.log('hola')} key={ess.id}>
        <div className="general-card__item">
          <div className="value">{ess.title}</div>
          <div className="label">{ess.date}</div>
        </div>
        <div className="general-card__item">
          <div className="score">{ess.score}</div>
          <div className="label">Puntos</div>
        </div>
        <div className="is-48x48" />
        <div className="menu">
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon color="#424242" /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem
              secondaryText="Borrar"
              onTouchTap={() => this.props.removeEssay(ess.id, ess.subject.id)}
            />
          </IconMenu>
        </div>
      </div>
    );
  }

  render() {
    if (is.null(this.props.essays)) {
      return <Loading />;
    }
    const essays = this.props.essays.map(essay => this.renderEssay(essay));

    return (
      <div>
        <div className="essay">
          <div className={`essay__header ${this.props.active ? 'bg-blue color-white' : ''}`} onClick={this.props.handleClick}>
            <div className="essay__title">{this.props.title}</div>
          </div>
          <Collapse isOpened={this.props.active}>
            <div className={`essay__body ${this.props.active ? 'essay__body_active' : ''}`}>
              {essays}
            </div>
          </Collapse>
        </div>
        <Divider />
      </div>
    );
  }
}

Essay.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  removeEssay: PropTypes.func.isRequired,
};

export default Essay;
