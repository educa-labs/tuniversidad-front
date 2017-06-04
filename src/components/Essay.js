import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import DropDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import IconButton from 'material-ui/IconButton';


const essays = [
  { title: 'Primer ensayo', score: 678, date: '17-05-2017' },
  { title: 'Primer ensayo preu', score: 578, date: '17-06-2017' },
  { title: 'Segundo', score: 750, date: '12-07-2017' },
  { title: 'Tercero ensayo', score: 678, date: '22-08-2017' },
  { title: 'Jornada', score: 450, date: '19-09-2017' },
];

function Essay(props) {
  function renderEssay(ess) {
    return (
      <div className="essay__score">
        <div className="col col-1">
          <div>{ess.title}</div>
          <div className="label">{ess.date}</div>
        </div>
        <div className="col col-1">
          <div className="score">{ess.score}</div>
          <div className="label">Puntaje</div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="essay">
        <div className={`essay__header ${props.active ? 'essay__header_active' : ''}`} onClick={props.handleClick}>
          <div className="essay__title">{props.title}</div>
          {/*<div className="essay__expand-button">
            <IconButton onTouchTap={props.handleClick}>
              <DropDown color="#0091EA" />
            </IconButton>
          </div>*/}
        </div>
        <div className={`essay__body ${props.active ? 'essay__body_active' : ''}`}>
          {essays.map(essay => renderEssay(essay))}
        </div>
      </div>
      <Divider />
    </div>
  );
}

Essay.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Essay;
