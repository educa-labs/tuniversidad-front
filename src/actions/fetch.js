import Request from 'superagent';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from './types';

import url from '../constants/url';

export function fetchUniversity(id, token) {
  const request = Request.get(`${url}/universities/${id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .accept('application/tuniversidad.v1')
    .withCredentials();
  return (dispatch) => {
    dispatch({
      type: FETCH_REQUEST,
    });
    return request
      .then((res) => {
        if (res.ok) {
          dispatch({
            type: FETCH_SUCCESS,
            payload: res.body,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: FETCH_FAILURE,
          error: err.response.body,
        });
      });
  };
}

