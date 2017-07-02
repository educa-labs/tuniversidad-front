import React, { Component, PropTypes } from 'react';
import is from 'is_js';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Loading from '../components/Loading';
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
    const missing = [];
    if (is.empty(this.props.essays[1].essays)) missing.push('Lenguaje');
    if (is.empty(this.props.essays[2].essays)) missing.push('Matemáticas');

    let source = null;
    if (goal.scores.science === null) {
      source = goal.scores.history;
      if (is.empty(this.props.essays[3].essays)) missing.push('Historia');
    } else {
      source = goal.scores.science;
      if (is.empty(this.props.essays[4].essays)) missing.push('Ciencias');
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
          <BarChart max={850} scores={scores} missing={missing} linkToProgress={this.props.linkToProgress} />
        </div>
        <Divider />
      </div>
    );
  }

  render() {
    const { goals, essays } = this.props;
    if (is.any.null(goals, essays[1], essays[2], essays[3], essays[4])) {
      return <Loading />;
    }
    const onSearchClick = () => this.context.router.push('/site/search');

    const noContent = (
      <div className="general-card__no-content">
        <div className="newton-pensando" />
        <div className="general-card__empty-msg">
          <div>
            ¿Tienes pensado estudiar alguna carrera? Te recomiendo usar el <span onClick={onSearchClick}>buscador </span> para añadirla a tus metas.
          </div>
        </div>
      </div>
    );

    return (
      <div className={`general-card ${this.props.mobile ? '' : 'general-card_desk'}`}>
        <div className="general-card__header">
          <div className="general-card__title">Mis Metas</div>
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
