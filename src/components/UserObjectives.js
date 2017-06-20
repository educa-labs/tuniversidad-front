import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/image/edit';
import UserObjectivesForm from './UserObjectivesForm';

class UserObjectives extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.objectives !== this.props.objectives) this.setState({ editMode: false });
  }

  render() {
    const { objectives, user } = this.props;
    if (objectives === null) return <div>Cargando ...</div>;
    return (
      <div className={`general-card ${this.props.mobile ? '' : 'general-card_desk'}`}>
        <UserObjectivesForm
          open={this.state.editMode}
          handleClose={() => this.setState({ editMode: false })}
          objectives={objectives}
          handleSubmit={this.props.handleSubmit}
        />
        <div className="general-card__header">
          <div className="general-card__title">Mi Objetivo</div>
          <div className="general-card__edit-button">
            <IconButton onTouchTap={() => this.setState({ editMode: true })}>
              <EditIcon color="#969696" />
            </IconButton>
          </div>
        </div>
        <div className="row">
          <div className="general-card__item">
            <div className="value">{objectives.language || '--'}</div>
            <div className="label">Lenguaje</div>
          </div>
          <div className="general-card__item">
            <div className="value">{objectives.math || '--'}</div>
            <div className="label">Matemáticas</div>
          </div>
          <div className="general-card__item">
            <div className="value">{objectives.science || '--'}</div>
            <div className="label">Ciencias</div>
          </div>
        </div>
        <div className="row">
          <div className="general-card__item">
            <div className="value">{objectives.history || '--'}</div>
            <div className="label">Historia</div>
          </div>
          <div className="general-card__item">
            <div className="value">{user.nem || 'Sin información'}</div>
            <div className="label">NEM</div>
          </div>
          <div className="general-card__item">
            <div className="value">{user.ranking || 'Sin información'}</div>
            <div className="label">Ranking</div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserObjectives;

