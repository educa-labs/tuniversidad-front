import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { Collapse } from 'react-collapse';
import { numeral } from '../helpers/numeral';
import { addGoal, removeGoal } from '../actions/goals';
import { addToCompare, removeFromCompare } from '../actions/compare';

const labelStyle = {
  color: '#0091EA',
  fontSize: '12px',
  fontWeight: 300,
};


class ExpandibleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.linkTo = this.linkTo.bind(this);
    this.handleInfoClick = this.handleInfoClick.bind(this);
    this.handleFavButton = this.handleFavButton.bind(this);
    this.getType = this.getType.bind(this);
  }

  handleInfoClick() {
    this.context.router.push(`site/career/${this.props.career.id}`);
  }
  linkTo() {
    this.context.router.push(`site/university/${this.props.career.university_id}`);
  }

  handleFavButton() {
    const { career, token, goals } = this.props;
    const isFavorite = _.findIndex(goals, goal => goal.carreer.id === career.id) > -1;
    if (isFavorite) {
      this.props.removeGoal(career.id, token);
    } else {
      this.props.addGoal(career.id, token);
    }
  }

  getType() {
    const { career } = this.props;
    if (career.weighing.science !== 0 && career.weighing.history) return 'Ciencias o Historia';
    return career.weighing.science !== 0 ? 'Ciencias' : 'Historia';
  }

  render() {
    const { career, goals } = this.props;
    const { expanded } = this.state;
    const isFavorite = _.findIndex(goals, goal => goal.carreer.id === career.id) > -1;
    
    return (
      <div>
        <div className="expandible-card">
          <div className="general-card__header" onClick={() => this.setState({ expanded: !expanded })}>
            <div className="col">
              <div className="general-card__title title_no-margin">{career.title}</div>
              <button className="general-card__subtitle color-blue">
                {career.university_name} en {career.campu_name}
              </button>
            </div>
            <IconButton
            >
              {expanded ? (
                <ArrowUp color="#424242" />
              ) : (
                <ArrowDown color="#424242" />
              )}
            </IconButton>
          </div>
          <Collapse isOpened={expanded}>
            <div className="expandible-card-body">
              <div className="row">
                <div className="general-card__item">
                  <div className="value">{career.weighing ? career.weighing.language : null}%</div>
                  <div className="label">Lenguaje</div>
                </div>
                <div className="general-card__item">
                  <div className="value">{career.weighing ? career.weighing.math : null}%</div>
                  <div className="label">Matemáticas</div>
                </div>
                <div className="general-card__item">
                  <div className="value">{career.weighing ? career.weighing.science || career.weighing.history : null}%</div>
                  <div className="label">{this.getType()}</div>
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
                  <div className="value">{career.price ? `$ ${numeral(career.price)}` : 'No disponible'}</div>
                  <div className="label">Arancel</div>
                </div>
              </div>
              <div className="row">
                <div className="general-card__item">
                  <div className="value">{career.income ? `$ ${numeral(career.income)}` : 'No disponible'}</div>
                  <div className="label">Sueldo promedio (3er año)</div>
                </div>
                <div className="general-card__item">
                  <div className="value">{career.employability ? `${career.employability}%` : 'No disponible'}</div>
                  <div className="label">Empleabilidad</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="start">
                <FlatButton
                  label={isFavorite ? 'Remover de mis metas' : 'Añadir a mis metas'}
                  secondary
                  labelStyle={labelStyle}
                  onTouchTap={this.handleFavButton}
                  disabled={this.props.requesting}
                />
              </div>
              <div className="end">
                <FlatButton label="Más información" secondary labelStyle={labelStyle} onTouchTap={this.handleInfoClick} />
              </div>
            </div>
          </Collapse>
        </div>
        <Divider />
      </div>
    );
  }
}

ExpandibleCard.propTypes = {
  // handleFavButton: PropTypes.func.isRequired,
  // handleInfoClick: PropTypes.func.isRequired,
  // handleSubTitleClick: PropTypes.func.isRequired,
  // isFavorite: PropTypes.bool.isRequired,
  // requesting: PropTypes.bool.isRequired,
};

ExpandibleCard.contextTypes = {
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
})(ExpandibleCard);

