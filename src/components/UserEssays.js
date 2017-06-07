import React, { PropTypes } from 'react';
import Essay from './Essay';


function UserEssays(props) {
  const loading = (
    <div>
      Cargando ...
    </div>
  );
  if (props.essays === null) return loading;
  if (!props.essays[1] || !props.essays[2] || !props.essays[3] || !props.essays[4]) return loading;

  return (
    <div className="general-card">
      <div className="general-card__header">
        <div className="general-card__title">Mis Ensayos</div>
      </div>
      <Essay
        title="Lenguaje"
        active={props.active === 1}
        handleClick={() => props.handleSubjectClick(1)}
        essays={props.essays[props.active].essays}
        removeEssay={props.removeEssay}
      />
      <Essay
        title="Matemáticas"
        active={props.active === 2}
        handleClick={() => props.handleSubjectClick(2)}
        essays={props.essays[props.active].essays}
        removeEssay={props.removeEssay}
      />
      <Essay
        title="Ciencias Naturales"
        active={props.active === 4}
        handleClick={() => props.handleSubjectClick(4)}
        essays={props.essays[props.active].essays}
        removeEssay={props.removeEssay}
      />
      <Essay
        title="Historia"
        active={props.active === 3}
        handleClick={() => props.handleSubjectClick(3)}
        essays={props.essays[props.active].essays}
        removeEssay={props.removeEssay}
      />
    </div>
  );
}

UserEssays.propTypes = {
  handleSubjectClick: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired,
};

export default UserEssays;
