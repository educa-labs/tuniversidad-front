import React, { PropTypes, Component } from 'react';
import Divider from 'material-ui/Divider';
import EditIcon from 'material-ui/svg-icons/image/edit';
import ClearIcon from 'material-ui/svg-icons/content/clear';
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

  renderEssay(ess) {
    return (
      <div className="essay__score" key={ess.id}>
        <div className="col col-1">
          <div>{ess.title}</div>
          <div className="label">{ess.date}</div>
        </div>
        <div className="col col-1">
          <div className="score">{ess.score}</div>
          <div className="label">Puntaje</div>
        </div>
        <div className="essay__delete-button">
          {this.state.editMode ? (
            <IconButton onTouchTap={() => this.props.removeEssay(ess.id, ess.subject.id)}>
              <ClearIcon color="#F44336" />
            </IconButton>
          ) : null}
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
    const editSection = this.props.active ? (
      <div className="essay__edit-button">
        <IconButton onTouchTap={() => this.setState({ editMode: !this.state.editMode })}>
          <EditIcon color="white" />
        </IconButton>
      </div>
      ) : null;

    return (
      <div>
        <div className="essay">
          <div className={`essay__header ${this.props.active ? 'essay__header_active' : ''}`} onClick={this.props.handleClick}>
            <div className="essay__title">{this.props.title}</div>
            {editSection}
          </div>
          <div className={`essay__body ${this.props.active ? 'essay__body_active' : ''}`}>
            {is.empty(this.props.essays) ? (
              <div>
                No has agregado ensayos de {this.props.title}
              </div>
            ) : essays}
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
