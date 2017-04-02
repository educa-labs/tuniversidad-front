import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import numeral from '../helpers/numeral';
import '../styles/ResultCard.css';

const labelStyle = {
  color: '#0091EA',
  fontSize: '12px',
};

function ResultCard({ career, onCompareClick, onFavClick, onInfoClick }) {
  return (
    <div className="result-card" >
      <Paper zDepth={2}>
        <div className="result-header">
          <span className="title">{career.title}</span> <br />
          <span>{career.universidad}</span>
        </div>
        <div className="content">
          <div className="admision">
            <div className="row">
              <div className="item">
                <div className="value">{career.admision.weights.nem}%</div>
                <div className="label">NEM</div>
              </div>
              <div className="item">
                <div className="value">{career.admision.weights.ranking}%</div>
                <div className="label">Ranking</div>
              </div>
              <div className="item">
                <div className="value">{career.admision.weights.lenguaje}%</div>
                <div className="label">Lenguaje</div>
              </div>
              <div className="item">
                <div className="value">{career.admision.weights.matematicas}%</div>
                <div className="label">Matematica</div>
              </div>
              <div className="item">
                <div className="value">{career.admision.weights.historia}%</div>
                <div className="label">Historia</div>
              </div>
            </div>
            <div className="row">
              <div className="item">
                <div className="value">{career.admision.system.cut}</div>
                <div className="label">{`Corte ${career.info.year}`}</div>
              </div>
              <div className="item">
                <div className="value">{career.admision.system.name}</div>
                <div className="label">Sistema de admisión</div>
              </div>
            </div>
          </div>
          <div className="info">
            <div className="row">
              <div className="item">
                <div className="value">{career.info.area}</div>
                <div className="label">Área</div>
              </div>
              <div className="item">
                <div className="value">{career.info.slots}</div>
                <div className="label">Vacantes</div>
              </div>
            </div>
            <div className="row">
              <div className="item">
                <div className="value">{career.info.duration} Semestres</div>
                <div className="label">Duración</div>
              </div>
              <div className="item">
                <div className="value">${numeral(career.info.salary)}</div>
                <div className="label">Sueldo promedio (3er año)</div>
              </div>
            </div>
            <div className="row">
              <div className="item">
                <div className="value">${numeral(career.info.tariff)}</div>
                <div className="label">Área</div>
              </div>
              <div className="item">
                <div className="value">{career.info.employability}%</div>
                <div className="label">Empleabilidad</div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="footer">
          <FlatButton
            label="Comparar"
            onTouchTap={onCompareClick}
            labelStyle={labelStyle}
          />
          <FlatButton
            label="Añadir a favoritos"
            onTouchTap={onFavClick}
            className="footer-button"
            labelStyle={labelStyle}
          />
          <FlatButton
            label="Más información"
            onTouchTap={onInfoClick}
            className="float-button"
            labelStyle={labelStyle}
          />
        </div>
      </Paper>
    </div>
  );
}

export default ResultCard;
