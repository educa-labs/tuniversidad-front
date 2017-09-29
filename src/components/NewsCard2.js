import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Collapse } from 'react-collapse';
import { getDate2 } from '../helpers/strings';
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
    this.parseBody = this.parseBody.bind(this);
  }

  componentWillMount() {
    getNewsPhoto(this.props.news.id, this.props.token)
      .then(res => this.setState({ src: res.body.picture }));
  }

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  parseBody() {
    const body = this.props.news.body.split("\n");
    const res = [];
    body.forEach((par) => {
      res.push(par);
      res.push(<br />);
    });
    return res;
  }

  render() {
    const { news, mobile } = this.props;
    const label = this.state.open ? 'Mostrar menos' : 'Mostrar más';
    let header = '';
    if (news.author) {
      header = `Por ${news.author}`;
      if (news.date) header = `${header}, ${getDate2(news.date)}`;
    } else if (news.date) header = getDate2(news.date);

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
            {this.parseBody()}
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
