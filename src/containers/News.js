import React from 'react';
import is from 'is_js';
import { connect } from 'react-redux';
import NewsCard from '../components/NewsCard2';
import MobileBanner from './MobileBanner';
import Loading from '../components/Loading';
import Grid from '../components/utility/Grid';
import '../styles/News.css';


function News(props) {
  if (is.null(props.news)) {
    return (
      <div className="fullscreen">
        <Loading />
      </div>
    );
  }
  return (
    <div className={`page page-news ${props.mobile ? 'page-news-mobile' : '' }`}>
      {props.mobile ? <MobileBanner onClick={props.toggleMenu} location="news" /> : null}
      <Grid columns={2} mobile={props.mobile}>
        {props.news.map(item => (
          <NewsCard key={item.id} news={item} mobile={props.mobile} token={props.token} />
        ))}
      </Grid>
    </div>
  );
}

export default connect(state => ({
  news: state.news.news,
  token: state.user.currentUser.auth_token,
}))(News);
