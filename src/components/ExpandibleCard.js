import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { Collapse } from 'react-collapse';
import { numeral } from '../helpers/numeral';

const labelStyle = {
  color: '#0091EA',
  fontSize: '12px',
};


class ExpandibleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.linkTo = this.linkTo.bind(this);
  }

  linkTo() {
    this.context.router.push(`site/university/${this.props.career.university_id}`);
  }

  render() {
    const { career, science } = this.props;
    const { expanded } = this.state;
    return (
      <div>
        <div className="expandible-card">
          <div className="general-card__header">
            <div className="col">
              <div className="general-card__title title_no-margin">{career.title}</div>
              <button className="general-card__subtitle color-blue" onClick={this.linkTo}>
                {career.university_name}
              </button>
            </div>
            <IconButton
              onTouchTap={() => this.setState({ expanded: !expanded })}
            >
              {this.state.expanded ? (
                <ArrowUp color="#424242" />
              ) : (
                <ArrowDown color="#424242" />
              )}
            </IconButton>
          </div>
          <Collapse isOpened={expanded}>
            <div className={`expandible-card-body`}>
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

export default ExpandibleCard;
