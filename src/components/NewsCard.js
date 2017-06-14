import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import '../styles/News.css';

class NewsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
  }

  handleExpandChange(expanded) {
    this.setState({ expanded });
  }


  render() {
    const { news } = this.props;
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} style={{ margin: '2rem' }}>
        <CardHeader
          title={news.author}
          subtitle={news.date}
          actAsExpander
          showExpandableButton
        />
        <CardMedia>
          <div className={`news-photo news-photo-${this.props.n}`} />
        </CardMedia>
        <CardTitle title={news.title} subtitle={news.subtitle} />
        <CardText expandable>
          {news.body}
        </CardText>
        <CardActions>
          <FlatButton
            label={this.state.expanded ? 'Mostrar menos' : 'Mostrar más'}
            onTouchTap={() => this.setState({ expanded: !this.state.expanded })}
          />
        </CardActions>
      </Card>
    );
  }
}

export default NewsCard;
