import React, { PropTypes } from 'react';
import Essay from './Essay';
import Loading from './Loading';


const subjects = [
  'Lenguaje',
  'Matemáticas',
  'Historia',
  'Ciencias Naturales',
];

function UserEssays(props) {
  if (props.essays === null) return <Loading />;
  if (!props.essays[1] || !props.essays[2] || !props.essays[3] || !props.essays[4]) return <Loading />;

  return (
    <div className={`general-card ${props.mobile ? '' : 'general-card_desk'}`}>
      <div className="general-card__header">
        <div className="general-card__title">Mis Ensayos</div>
      </div>
      {subjects.map((sub, index) => (
        <Essay
          key={index}
          title={subjects[index]}
          active={props.active === index + 1}
          handleClick={() => props.handleSubjectClick(index + 1)}
          removeEssay={props.removeEssay}
          selectEssay={props.selectEssay}
          essays={props.essays[props.active].essays}
        />
      ))}
    </div>
  );
}

UserEssays.propTypes = {
  handleSubjectClick: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired,
};

export default UserEssays;
