import React, { PropTypes } from 'react';
import Essay from './Essay';


function UserEssays(props) {
  return (
    <div className="general-card">
      <div className="general-card__header">
        <div className="general-card__title">Mis Ensayos</div>
      </div>
      <Essay
        title="Lenguaje"
        active={props.active === 1}
        handleClick={() => props.handleSubjectClick(1)}
      />
      <Essay
        title="Matemáticas"
        active={props.active === 2}
        handleClick={() => props.handleSubjectClick(2)}
      />
      <Essay
        title="Ciencias Naturales"
        active={props.active === 4}
        handleClick={() => props.handleSubjectClick(4)}
      />
      <Essay
        title="Historia"
        active={props.active === 3}
        handleClick={() => props.handleSubjectClick(3)}
      />
    </div>
  );
}

UserEssays.propTypes = {
  handleSubjectClick: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired,
};

export default UserEssays;
