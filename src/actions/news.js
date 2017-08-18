import Request from 'superagent';
import {
  NEWS_FAILURE,
  NEWS_REQUEST,
  NEWS_SUCCESS,
} from './types';
import url from '../constants/url';

export function getNews(token) {
  const request = Request.get(`${url}/news`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .accept('application/tuniversidad.v1')
    .withCredentials();
  return (dispatch) => {
    dispatch({
      type: NEWS_REQUEST,
    });
    return request
      .then((res) => {
        if (res.ok) {
          dispatch({
            type: NEWS_SUCCESS,
            news: res.body,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: NEWS_FAILURE,
        });
      });
  };
}
