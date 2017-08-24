import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Collapse } from 'react-collapse';
import { getDate } from '../helpers/strings';
import { getNewsPhoto } from '../helpers/api';

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
      src: null,
    };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  componentWillMount() {
    getNewsPhoto(this.props.news.id, this.props.token)
      .then(res => this.setState({ src: res.body.picture }));
  }

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { news, mobile } = this.props;
    const label = this.state.open ? 'Mostrar menos' : 'Mostrar más';
    let header = '';
    if (news.author) {
      header = `Por ${news.author}`;
      if (news.created_at) header = `${header}, ${getDate(news.created_at)}`;
    } else if (news.created_at) header = getDate(news.created_at);

    return (
      <div className={`general-card ${mobile ? '' : 'general-card_desk'}`}>
        <div className="news-photo" style={{ backgroundImage: `url(${this.state.src})` }} />
        <div className="news-header">
          <div className="news-date">{header}</div>
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
