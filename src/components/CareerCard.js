import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import _ from 'lodash';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { addGoal, removeGoal } from '../actions/goals';
import { addToCompare, removeFromCompare } from '../actions/compare';
import numeral from '../helpers/numeral';

const labelStyle = {
  color: '#0091EA',
  fontSize: '12px',
};

function CareerCard(props, context) {
  const { career } = props;
  const isFavorite = _.findIndex(props.goals, item => item.id === career.id) > -1;
  const isCompare = is.inArray(career.id, props.compare);

  function handleFavButton() {
    if (isFavorite) {
      props.removeGoal(career.id, props.token);
    } else {
      props.addGoal(career.id, props.token);
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
    context.router.push(`site/career/${career.id}`);
  }

  function handleSubTitleClick() {
    context.router.push(`site/university/${career.university_id}`);
  }

  const science = career.weighing ? is.existy(career.weighing.science) : null;

  return (
    <div className={`card ${props.detail ? 'card_detail' : ''}`}>
      <Paper zDepth={2}>
        <div className={`card__header ${props.detail ? 'card__header_hide' : ''}`}>
          <div className="col">
            <div className="card__title" onClick={handleInfoClick} >{career.title}</div>
          </div>
          <div className="col col_subtitle">
            <div className="card__subtitle" onClick={handleSubTitleClick}>{career.university_name}</div>
          </div>
        </div>
        <div className="card__body card__body_career">
            <div className="col col_row">
              <div className="row">
                <div className="card__psu-item">
                  <div className="value">{career.weighing ? career.weighing.NEM : null}%</div>
                  <div className="label">NEM</div>
                </div>
                <div className="card__psu-item">
                  <div className="value">{career.weighing ? career.weighing.ranking : null}%</div>
                  <div className="label">Ranking</div>
                </div>
                <div className="card__psu-item">
                  <div className="value">{career.weighing ? career.weighing.language : null}%</div>
                  <div className="label">Lenguaje</div>
                </div>
                <div className="card__psu-item">
                  <div className="value">{career.weighing ? career.weighing.math : null}%</div>
                  <div className="label">Matematica</div>
                </div>
                <div className="card__psu-item">
                  <div className="value">{career.weighing ? career.weighing.science || career.weighing.history : null}%</div>
                  <div className="label">{science ? 'Ciencias' : 'Historia'}</div>
                </div>
              </div>
              <div className="row">
                <div className="card__psu-item">
                  <div className="value">{career.last_cut}</div>
                  <div className="label">Corte 2016</div>
                </div>
                <div className="card__psu-item">
                  <div className="value">{career.admission}</div>
                  <div className="label">Admisión</div>
                </div>
              </div>
            </div>
            <div className="col col_row">
              <div className="row">
                <div className="col">
                  <div className="value">{career.area_title}</div>
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
                  <div className="value">${career.income ? numeral(career.income) : null}</div>
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
        <div className={`card__description ${props.detail ? '' : 'card__description_hide'}`} >
          <div className="row">
            <div className="col">{career.description}</div>
          </div>
        </div>
        <Divider />
        <div className={`card__footer ${props.detail ? 'card__footer_hide' : ''}`}>
          <div className="start">
            <FlatButton
              label={isFavorite ? 'Remover de mis metas' : 'Añadir a mis metas'}
              secondary
              labelStyle={labelStyle}
              onTouchTap={handleFavButton}
              disabled={props.requesting}
            />
            <FlatButton label="Comparar" secondary labelStyle={labelStyle} onTouchTap={handleCompareButton} />
          </div>
          <div className="end">
            <FlatButton label="Más información" secondary labelStyle={labelStyle} onTouchTap={handleInfoClick} />
          </div>
        </div>
      </Paper>
    </div>
  );
}

CareerCard.propTypes = {
  addToCompare: PropTypes.func.isRequired,
  compare: PropTypes.arrayOf(PropTypes.number).isRequired,
  detail: PropTypes.bool,
  requesting: PropTypes.bool.isRequired,
  addGoal: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

CareerCard.defaultProps = {
  detail: false,
};

CareerCard.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    goals: state.goals.goals,
    requesting: state.goals.requesting,
    token: state.user.currentUser.auth_token,
    compare: state.compare,
  };
}


export default connect(mapStateToProps, {
  addGoal,
  removeGoal,
  addToCompare,
  removeFromCompare,
})(CareerCard);
