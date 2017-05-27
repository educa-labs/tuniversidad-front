import React from 'react';
import EditIcon from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import BarChart from './BarChart';


function UserGoals({ goals }) {
  function renderGoal(goal) {
    return (
      <div className="goal" key={goal.id}>
        <div className="goal__title">{`${goal.title} en ${goal.university_name}`}</div>
        <BarChart max={850} />
      </div>
    );
  }
  if (goals === null) return <div>Cargando ... </div>;

  return (
    <div className="general-card">
      <div className="row">
        <div className="general-card__title">Mis Metas</div>
        <div className="general-card__edit-button">
          <IconButton><EditIcon color="#424242" /></IconButton>
        </div>
      </div>
      {goals.map(goal => renderGoal(goal))}
    </div>
  );
}

export default UserGoals;
