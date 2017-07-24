import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import _ from 'lodash';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { addGoal, removeGoal } from '../actions/goals';
import { addToCompare, removeFromCompare } from '../actions/compare';
import { numeral } from '../helpers/numeral';

const labelStyle = {
  color: '#0091EA',
  fontSize: '12px',
};

function CareerCard(props, context) {
  const { career } = props;
  const isFavorite = _.findIndex(props.goals, goal => goal.carreer.id === career.id) > -1;
  // const isCompare = is.inArray(career.id, props.compare);

  function handleFavButton() {
    if (isFavorite) {
      props.removeGoal(career.id, props.token);
    } else {
      props.addGoal(career.id, props.token);
    }
  }

  function handleInfoClick() {
    context.router.push(`site/career/${career.id}`);
  }

  function handleSubTitleClick() {
    context.router.push(`site/university/${career.university_id}`);
  }

  const science = career.weighing ? is.existy(career.weighing.science) : null;


  const header = props.mobile ? (
    <div className={`general-card__header bg-blue ${props.detail ? 'general-card__header_hide' : ''}`}>
      <div className="col">
        <div className="general-card__title title_no-margin color-white">{career.title}</div>
        <button className="general-card__subtitle color-white" onClick={handleSubTitleClick}>{career.university_name} en {career.campu_name}</button>
      </div>
    </div>
  ) : (
    <div className={`general-card__header bg-blue ${props.detail ? 'card__header_hide' : ''}`}>
      <div className="general-card__title color-white cursor" onClick={handleInfoClick}>{career.title}</div>
      <div className="color-white cursor" onClick={handleSubTitleClick}>{career.university_name} en {career.campu_name}</div>
    </div>
  );

  const body = props.mobile ? (
    <div>
      <div className="row">
        <div className="general-card__item">
          <div className="value">{career.weighing ? career.weighing.language : null}%</div>
          <div className="label">Lenguaje</div>
        </div>
        <div className="general-card__item">
          <div className="value">{career.weighing ? career.weighing.math : null}%</div>
          <div className="label">Matematica</div>
        </div>
        <div className="general-card__item">
          <div className="value">{career.weighing ? career.weighing.science || career.weighing.history : null}%</div>
          <div className="label">{science ? 'Ciencias' : 'Historia'}</div>
        </div>
      </div>
      <div className="row">
        <div className="general-card__item">
          <div className="value">{career.weighing ? career.weighing.NEM : null}%</div>
          <div className="label">NEM</div>
        </div>
        <div className="general-card__item">
          <div className="value">{career.weighing ? career.weighing.ranking : null}%</div>
          <div className="label">Ranking</div>
        </div>
        <div className="general-card__item">
          <div className="value">{career.last_cut}</div>
          <div className="label">Corte 2016</div>
        </div>
      </div>
      <div className="row">
        <div className="general-card__item">
          <div className="value">{career.area_title}</div>
          <div className="label">Área</div>
        </div>
        <div className="general-card__item">
          <div className="value">{career.openings}</div>
          <div className="label">Vacantes</div>
        </div>
      </div>
      <div className="row">
        <div className="general-card__item">
          <div className="value">{career.semesters} Semestres</div>
          <div className="label">Duración</div>
        </div>
        <div className="general-card__item">
          <div className="value">{numeral(career.price)}</div>
          <div className="label">Arancel</div>
        </div>
      </div>
      <div className="row">
        <div className="general-card__item">
          <div className="value">${career.income ? numeral(career.income) : null}</div>
          <div className="label">Sueldo promedio (3er año)</div>
        </div>
        <div className="general-card__item">
          <div className="value">%{career.employability}</div>
          <div className="label">Empleabilidad</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="general-card__item">
            <div className="value">{career.weighing ? career.weighing.language : 'No disponible'}%</div>
            <div className="label">Lenguaje</div>
          </div>
          <div className="general-card__item">
            <div className="value">{career.weighing ? career.weighing.math : 'No disponible'}%</div>
            <div className="label">Matematica</div>
          </div>
          <div className="general-card__item">
            <div className="value">{career.weighing ? career.weighing.science || career.weighing.history : 'No disponible'}%</div>
            <div className="label">{science ? 'Ciencias' : 'Historia'}</div>
          </div>
          <div className="general-card__item">
            <div className="value">{career.weighing ? career.weighing.NEM : 'No disponible'}%</div>
            <div className="label">NEM</div>
          </div>
          <div className="general-card__item">
            <div className="value">{career.weighing ? career.weighing.ranking : 'No disponible'}%</div>
            <div className="label">Ranking</div>
          </div>
        </div>
        <div className="row">
          <div className="general-card__item col-2">
            <div className="value">{career.area_title || 'No disponible'}</div>
            <div className="label">Área</div>
          </div>
          <div className="general-card__item">
            <div className="value">{career.last_cut || 'No disponible'}</div>
            <div className="label">Corte 2016</div>
          </div>
          <div className="general-card__item col-2">
            <div className="value">{career.openings || 'No disponible'}</div>
            <div className="label">Vacantes</div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <div className="general-card__item">
            <div className="value">{career.semesters || 'No disponible'} Semestres</div>
            <div className="label">Duración</div>
          </div>
          <div className="general-card__item">
            <div className="value">{`$${numeral(career.price)}` || 'No disponible'}</div>
            <div className="label">Arancel</div>
          </div>
        </div>
        <div className="row">
          <div className="general-card__item">
            <div className="value">{career.income ? `$${numeral(career.income)}` : 'No disponible'}</div>
            <div className="label">Sueldo promedio (3er año)</div>
          </div>
          <div className="general-card__item">
            <div className="value">{career.employability ? `${career.employability}%` : 'No disponible'}</div>
            <div className="label">Empleabilidad</div>
          </div>
        </div>
      </div>
    </div>
  );

  const description = props.detail ? (
    <div className="general-card-description">{career.description}</div>
  ) : null;

  const footer = !props.detail ? (
    <div className="row">
      <div className="start">
        <FlatButton
          label={isFavorite ? 'Remover de mis metas' : 'Añadir a mis metas'}
          secondary
          labelStyle={labelStyle}
          onTouchTap={handleFavButton}
          disabled={props.requesting}
        />
      </div>
      <div className="end">
        <FlatButton label="Más información" secondary labelStyle={labelStyle} onTouchTap={handleInfoClick} />
      </div>
    </div>
  ) : null;

  return (
    <div className={`general-card ${props.mobile ? '' : 'general-card_desk'}`}>
      {header}
      {body}
      {description}
      <Divider />
      {footer}
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
