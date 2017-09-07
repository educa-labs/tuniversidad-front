import Request from 'superagent';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from './types';

import url from '../constants/url';

export function fetch(key, id, token) {
  let path = null;
  if (key === 'university') path = `${url}/universities/${id}`;
  else if (key === 'universities') path = `${url}/universities`;
  else if (key === 'career') path = `${url}/carreers/${id}`;
  else if (key === 'areas') path = `${url}/areas`;
  else if (key === 'types') path = `${url}/university_types`;
  else if (key === 'schedules') path = `${url}/schedules`;
  else if (key === 'regions') path = `${url}/regions`;
  else if (key === 'subjects') path = `${url}/subjects`;
  else if (key === 'cities') path = `${url}/regions/${id}/cities`;
  else {
    console.error('Key error', key);
  }


  const request = Request.get(path)
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
            key,
            payload: res.body,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: FETCH_FAILURE,
          error: err.response,
        });
      });
  };
}

