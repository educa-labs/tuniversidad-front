import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { addToFavorites, removeFromFavorites } from '../actions/favs';
import { addToCompare, removeFromCompare } from '../actions/compare';
import numeral from '../helpers/numeral';

const labelStyle = {
  color: '#0091EA',
  fontSize: '12px',
};

function CareerCard(props, context) {
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

  const science = is.existy(career.weighing.science);

  return (
    <div className="card" >
      <Paper zDepth={2}>
        <div className="card__header">
          <div className="col">
            <div className="card__title">{career.title}</div>
          </div>
          <div className="col col_subtitle">
            <div className="card__subtitle" onClick={handleSubTitleClick}>{career.university_name}</div>
          </div>
        </div>
        <div className="card__body card__body_career">
            <div className="col col_row">
              <div className="row">
                <div className="card__psu-item">
                  <div className="value">{career.weighing.NEM}%</div>
                  <div className="label">NEM</div>
                </div>
                <div className="card__psu-item">
                  <div className="value">{career.weighing.ranking}%</div>
                  <div className="label">Ranking</div>
                </div>
                <div className="card__psu-item">
                  <div className="value">{career.weighing.language}%</div>
                  <div className="label">Lenguaje</div>
                </div>
                <div className="card__psu-item">
                  <div className="value">{career.weighing.math}%</div>
                  <div className="label">Matematica</div>
                </div>
                <div className="card__psu-item">
                  <div className="value">{career.weighing.science || career.weighing.history}%</div>
                  <div className="label">{science ? 'Ciencias' : 'Historia'}</div>
                </div>
              </div>
              <div className="row">
                <div className="card__psu-item">
                  <div className="value">{career.last_cut}</div>
                  <div className="label">Corte 2016</div>
                </div>
                <div className="card__psu-item-extended">
                  <div className="value">{career.admission}</div>
                  <div className="label">Sistema de admisión</div>
                </div>
              </div>
            </div>
            <div className="col col_row">
              <div className="row">
                <div className="col">
                  <div className="value">{career.area}</div>
                  <div className="label">Área</div>
                </div>
                <div className="col">
                  <div className="value">{career.openings}</div>
                  <div className="label">Vacantes</div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="value">{career.semesters} Semestres</div>
                  <div className="label">Duración</div>
                </div>
                <div className="col">
                  <div className="value">${numeral(career.income)}</div>
                  <div className="label">Sueldo promedio (3er año)</div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="value">{numeral(career.price)}</div>
                  <div className="label">Arancel</div>
                </div>
                <div className="col">
                  <div className="value">%{career.employability}</div>
                  <div className="label">Empleabilidad</div>
                </div>
              </div>
            </div>
        </div>
      </Paper>
    </div>
  );
}

CareerCard.propTypes = {
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  addToCompare: PropTypes.func.isRequired,
  removeFromCompare: PropTypes.func.isRequired,
  favs: PropTypes.arrayOf(PropTypes.number).isRequired,
  compare: PropTypes.arrayOf(PropTypes.number).isRequired,
  general: PropTypes.bool,
};

CareerCard.defaultProps = {
  general: false,
};

CareerCard.contextTypes = {
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
})(CareerCard);
