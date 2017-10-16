import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { Collapse } from 'react-collapse';
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
      popup: false,
    };
    this.linkTo = this.linkTo.bind(this);
    this.handleInfoClick = this.handleInfoClick.bind(this);
    this.handleFavButton = this.handleFavButton.bind(this);
    this.getType = this.getType.bind(this);
  }
  getType() {
    const { career } = this.props;
    if (career.weighing.science !== 0 && career.weighing.history) return 'Historia o Ciencias';
    return career.weighing.science !== 0 ? 'Ciencias' : 'Historia';
  }

  handleInfoClick() {
    this.context.router.push(`${this.props.guest ? '' : 'site'}/career/${this.props.career.id}`);
  }
  linkTo() {
    this.context.router.push(`${this.props.guest ? '' : 'site'}/university/${this.props.career.university_id}`);
  }

  handleFavButton() {
    const { career, token, goals, guest, goalClick } = this.props;
    if (guest) {
      goalClick();
    } else {
      const isFavorite = _.findIndex(goals, goal => goal.carreer.id === career.id) > -1;
      if (isFavorite) {
        this.props.removeGoal(career.id, token);
      } else {
        this.props.addGoal(career.id, token);
      }
    }
  }

  render() {
    const { career, goals, mobile } = this.props;
    const { expanded } = this.state;
    const isFavorite = _.findIndex(goals, goal => goal.carreer.id === career.id) > -1;
    
    return (
      <div>
        <div className="expandible-card">
          <div className="general-card__header cursor" onClick={() => this.setState({ expanded: !expanded })}>
            <div className="col">
              <div className={`general-card__title title_no-margin ${mobile ? 'title-truncate' : ''}`}>{career.title}</div>
              <button className={`general-card__subtitle color-blue ${mobile ? 'title-truncate' : ''}`}>
                <span onTouchTap={this.linkTo} className="hover-blue">{career.university_name} en {career.campu_name}</span>
              </button>
            </div>
            <IconButton>
              {expanded ? (
                <ArrowUp color="#424242" />
              ) : (
                <ArrowDown color="#424242" />
              )}
            </IconButton>
          </div>
          <Collapse isOpened={expanded}>
            <div className="expandible-body">
              <div className="row">
                <div className="expandible-label">NEM</div>
                <div className="expandible-value">{career.weighing ? career.weighing.NEM : null}%</div>
              </div>
              <div className="row">
                <div className="expandible-label">Ranking</div>
                <div className="expandible-value">{career.weighing ? career.weighing.ranking : null}%</div>
              </div>
              <div className="row">
                <div className="expandible-label">Lenguaje</div>
                <div className="expandible-value">{career.weighing ? career.weighing.language : null}%</div>
              </div>
              <div className="row">
                <div className="expandible-label">Matemáticas</div>
                <div className="expandible-value">{career.weighing ? career.weighing.math : null}%</div>
              </div>
              <div className="row">
                <div className="expandible-label">{this.getType()}</div>
                <div className="expandible-value">{career.weighing ? career.weighing.science || career.weighing.history : null}%</div>
              </div>
              <div className="row">
                <div className="expandible-label">Corte 2016</div>
                <div className="expandible-value">{career.last_cut}</div>
              </div>
            </div>
            <div className="row no-margin">
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

ExpandibleCard.defaultProps = {
  mobile: false,
  guest: false,
};

ExpandibleCard.propTypes = {
  // handleFavButton: PropTypes.func.isRequired,
  // handleInfoClick: PropTypes.func.isRequired,
  // handleSubTitleClick: PropTypes.func.isRequired,
  // isFavorite: PropTypes.bool.isRequired,
  // requesting: PropTypes.bool.isRequired,
  mobile: PropTypes.bool,
  guest: PropTypes.bool,
};

ExpandibleCard.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    token: state.user.currentUser ? state.user.currentUser.auth_token : null,
    goals: state.goals.goals,
    requesting: state.goals.requesting,
    compare: state.compare,
  };
}


export default connect(mapStateToProps, {
  addGoal,
  removeGoal,
  addToCompare,
  removeFromCompare,
})(ExpandibleCard);

