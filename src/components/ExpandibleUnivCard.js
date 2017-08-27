import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { Collapse } from 'react-collapse';
import { getDate } from '../helpers/strings';

const labelStyle = {
  color: '#0091EA',
  fontSize: '12px',
  fontWeight: 300,
};

class ExpandibleUnivCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.handleInfoClick = this.handleInfoClick.bind(this);
  }

  handleInfoClick() {
    this.context.router.push(`site/university/${this.props.university.id}`);
  }

  render() {
    const { expanded } = this.state;
    const { university, mobile } = this.props;
    return (
      <div>
        <div className="expandible-card">
          <div className="general-card__header" onClick={() => this.setState({ expanded: !expanded })}>
            <div className="col">
            <div className={`general-card__title title_no-margin ${mobile ? 'title-truncate' : ''}`}>{university.title}</div>
              <button className={`general-card__subtitle color-blue ${mobile ? 'title-truncate' : ''}`}>
                {university.motto || ''}
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
                <div className="expandible-label">Tipo</div>
                <div className="expandible-value">{university.u_type}</div>
              </div>
              <div className="row">
                <div className="expandible-label">Sigla</div>
                <div className="expandible-value">{university.initials}</div>
              </div>
              <div className="row">
                <div className="expandible-label">Gratuidad</div>
                <div className="expandible-value">{university.freeness ? 'Sí' : 'No'}</div>
              </div>
              <div className="row">
                <div className="expandible-label">Fundación</div>
                <div className="expandible-value">{getDate(university.foundation)}</div>
              </div>
            </div>
            <div className="row no-margin">
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

ExpandibleUnivCard.contextTypes = {
  router: PropTypes.object,
};

export default ExpandibleUnivCard;
