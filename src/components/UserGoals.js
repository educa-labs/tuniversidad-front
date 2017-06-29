import React, { Component, PropTypes } from 'react';
import is from 'is_js';
import EditIcon from 'material-ui/svg-icons/image/edit';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import BarChart from './BarChart';


class UserGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
    this.renderGoal = this.renderGoal.bind(this);
  }

  

  renderGoal(goal) {
    let source = null;
    if (goal.scores.science === null) {
      source = goal.scores.history;
    } else {
      source = goal.scores.science;
    }
    const both = goal.scores.science !== null && goal.scores.history !== null;
    const scores = Object.assign({}, {
      last_cut: goal.scores.last_cut,
      avg: both ? Math.max(goal.scores.science.avg, goal.scores.history.avg) : source.max,
      obj: both ? Math.max(goal.scores.science.obj, goal.scores.history.obj) : source.obj,
    });

    const onClick = () => this.context.router.push(`site/career/${goal.carreer.id}`);

    return (
      <div key={goal.carreer.id}>
        <div className="goal">
          <div className="goal__header">
            <div className="goal__title" onClick={onClick}>{`${goal.carreer.title} en ${goal.carreer.university_name}`}</div>
            {this.state.editMode ? (
              <div className="goal__delete-button">
                <IconButton
                  onTouchTap={() => this.props.removeGoal(goal.carreer.id)}
                  tooltip="Remover"
                >
                  <ClearIcon color="#F44336" />
                </IconButton>
              </div>
            ) : null}
          </div>
          <BarChart max={850} scores={scores} />
        </div>
        <Divider />
      </div>
    );
  }

  render() {
    if (this.props.goals === null) return <div>Cargando ... </div>;

    const noContent = (
      <div className="general-card__no-content">
        <div className="newton-pensando" />
        <div className="general-card__empty-msg">
          <div>¿Tienes pensado estudiar alguna carrera? Te recomiendo usar el <span>buscador</span> para añadirla a tus metas.</div>
        </div>
      </div>
    );

    return (
      <div className={`general-card ${this.props.mobile ? '' : 'general-card_desk'}`}>
        <div className="general-card__header">
          <div className="general-card__title">Mis Metas</div>
          <div className="general-card__edit-button">
            <IconButton onTouchTap={() => this.setState({ editMode: !this.state.editMode })}>
              <EditIcon color="#969696" />
            </IconButton>
          </div>
        </div>
        {is.empty(this.props.goals) ? noContent : this.props.goals.map(goal => this.renderGoal(goal))}
      </div>
    );
  }
}

UserGoals.contextTypes = {
  router: PropTypes.object,
};

export default UserGoals;
