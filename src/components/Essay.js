import React, { PropTypes, Component } from 'react';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import is from 'is_js';


class Essay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
    this.renderEssay = this.renderEssay.bind(this);
  }
  // 
  renderEssay(ess) {
    return (
      <div className="essay__score" key={ess.id}>
        <div className="col">
          <div>{ess.title}</div>
          <div className="label">{ess.date}</div>
        </div>
        <div className="col">
          <div className="score">{ess.score}</div>
          <div className="label">Puntaje</div>
        </div>
        <div className="score-menu">
          <div className="menu">
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem secondaryText="Editar" />
              <MenuItem
                secondaryText="Borrar"
                onTouchTap={() => this.props.removeEssay(ess.id, ess.subject.id)}
              />
            </IconMenu>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (is.null(this.props.essays)) {
      return (
        <div>
          Cargando ...
        </div>
      );
    }
    const essays = this.props.essays.map(essay => this.renderEssay(essay));

    return (
      <div>
        <div className="essay">
          <div className={`essay__header ${this.props.active ? 'essay__header_active' : ''}`} onClick={this.props.handleClick}>
            <div className="essay__title">{this.props.title}</div>
          </div>
          <div className={`essay__body ${this.props.active ? 'essay__body_active' : ''}`}>
             {essays}
          </div>
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
