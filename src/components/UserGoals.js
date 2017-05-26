import React from 'react';
import EditIcon from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';


function UserGoals({ goals }) {
  function renderGoal(goal) {
    return (
      <div className="general-card__goal" key={goal.id}>
        {goal.title}
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
