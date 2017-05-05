import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { addToFavorites, removeFromFavorites } from '../actions/favs';
import { addToCompare, removeFromCompare } from '../actions/compare';
import numeral from '../helpers/numeral';
import '../styles/ResultCard.css';

const labelStyle = {
  color: '#0091EA',
  fontSize: '12px',
};

function ResultCard(props, context) {
  const { career, favs, compare } = props;

  const isFavorite = is.inArray(career.id, favs);
  const isCompare = is.inArray(career.id, compare);

  function handleFavButton() {
    if (isFavorite) {
      props.removeFromFavorites(career.id);
    } else {
      props.addToFavorites(career.id);
    }
  }
  function handleCompareButton() {
    if (isCompare) {
      props.removeFromCompare(career.id);
    } else {
      props.addToCompare(career.id);
    }
  }
  function handleInfoClick() {
    context.router.push(`careers/${career.id}`);
  }

  function handleSubTitleClick() {
    context.router.push(`site/university/${career.university_id}`);
  }

  return (
    <div className="result-card" >
      <Paper zDepth={props.general ? 0 : 2}>
        {props.general ? null : (
          <div className="result-header">
            <div className="title">{career.title}</div>
            <div className="subtitle" onClick={handleSubTitleClick} >{career.universidad}</div>
          </div>
        )}
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
        {props.general ? null : (
          <div className="footer">
            <Divider />
            <FlatButton
              label={isCompare ? 'Dejar de comparar' : 'Comparar'}
              onTouchTap={handleCompareButton}
              labelStyle={labelStyle}
            />
            <FlatButton
              label={isFavorite ? 'Remover de favoritos' : 'Añadir a favoritos'}
              onTouchTap={handleFavButton}
              className="footer-button"
              labelStyle={labelStyle}
            />
            <FlatButton
              label="Más información"
              onTouchTap={handleInfoClick}
              className="float-button"
              labelStyle={labelStyle}
            />
          </div>
        )}
      </Paper>
    </div>
  );
}

ResultCard.propTypes = {
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  addToCompare: PropTypes.func.isRequired,
  removeFromCompare: PropTypes.func.isRequired,
  favs: PropTypes.arrayOf(PropTypes.number).isRequired,
  compare: PropTypes.arrayOf(PropTypes.number).isRequired,
  general: PropTypes.bool,
};

ResultCard.defaultProps = {
  general: false,
};

ResultCard.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    favs: state.favs,
    compare: state.compare,
  };
}


export default connect(mapStateToProps, {
  addToFavorites,
  removeFromFavorites,
  addToCompare,
  removeFromCompare,
})(ResultCard);
