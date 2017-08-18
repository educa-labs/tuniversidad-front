import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Collapse } from 'react-collapse';
import { getDate } from '../helpers/strings';

const labelStyle = {
  color: '#0091EA',
  fontSize: '12px',
  fontWeight: 300,
};

class NewsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { news, mobile } = this.props;
    const label = this.state.open ? 'Mostrar menos' : 'Mostrar más';
    return (
      <div className={`general-card ${mobile ? '' : 'general-card_desk'}`}>
        <div className="news-photo" style={{ backgroundImage: `url(${news.picture})` }} />
        <div className="news-header">
          <div className="news-date">
            Por {news.author}, {getDate(news.created_at)}
          </div>
          <div className="general-card__title title_no-margin">{news.title}</div>
          <div className="general-card__subtitle color-blue">{news.lowering}</div>
        </div>
        <Collapse isOpened={this.state.open}>
          <div className="news-body">
            {news.body}
          </div>
        </Collapse>
        <div className="row">
          <div className="end">
            <FlatButton label={label} secondary labelStyle={labelStyle} onTouchTap={this.toggleOpen} />
          </div>
        </div>
      </div>
    );
  }
}

export default NewsCard;
