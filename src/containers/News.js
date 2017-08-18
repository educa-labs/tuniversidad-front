import React from 'react';
import is from 'is_js';
import { connect } from 'react-redux';
import NewsCard from '../components/NewsCard2';
import MobileBanner from './MobileBanner';
import Loading from '../components/Loading';
import '../styles/News.css';


function News(props) {
  if (is.null(props.news)) {
    return (
      <div className="fullscreen">
        <Loading />
      </div>
    );
  }
  if (props.mobile) {
    return (
      <div className="page page-news page-news-mobile">
        <MobileBanner onClick={props.toggleMenu} location="news" />
        {props.news.map(item => (
          <NewsCard key={item.id} news={item} mobile />
        ))}
      </div>
    );
  }
  return (
    <div className="page page-news">
      <div className="row">
        <div className="col">
          {props.news.map((item, index) => {
            if (index % 2 === 0) return <NewsCard key={item.id} news={item} />;
            return null;
          })}
        </div>
        <div className="col">
          {props.news.map((item, index) => {
            if (index % 2 === 1) return <NewsCard key={item.id} news={item} />;
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default connect(state => ({
  news: state.news.news,
}))(News);
