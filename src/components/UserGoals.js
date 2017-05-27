import React, { Component } from 'react';
import EditIcon from 'material-ui/svg-icons/image/edit';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import BarChart from './BarChart';



class UserGoals extends Component {
  componentWillMount() {
    this.setState({ editMode: false });
    this.renderGoal = this.renderGoal.bind(this);
  }

  renderGoal(goal) {
    return (
      <div>
        <div className="goal" key={goal.id}>
          <div className="goal__header">
            <div className="goal__title">{`${goal.title} en ${goal.university_name}`}</div>
            {this.state.editMode ? (
              <div className="goal__delete-button">
                <IconButton
                  onTouchTap={() => this.props.removeGoal(goal.id, this.props.token)}
                  tooltip="Remover"
                >
                  <ClearIcon color="#F44336" />
                </IconButton>
              </div>
            ) : null}
          </div>
          <BarChart max={850} />
        </div>
        <Divider />
      </div>
    );
  }

  render() {
    if (this.props.goals === null) return <div>Cargando ... </div>;
    return (
      <div className="general-card">
        <div className="general-card__header">
          <div className="general-card__title">Mis Metas</div>
          <div className="general-card__edit-button">
            <IconButton
              tooltip="Editar metas"
              tooltipPosition="bottom-left"
              onTouchTap={() => this.setState({ editMode: !this.state.editMode })}
            >
              <EditIcon color={this.state.editMode ? '#424242' : '#C9C9C9'} />
            </IconButton>
          </div>
        </div>
        {this.props.goals.map(goal => this.renderGoal(goal))}
      </div>
    );
  }
}

export default UserGoals;
