import Request from 'superagent';
import {
  OBJECTIVES_FAILURE,
  OBJECTIVES_REQUEST,
  OBJECTIVES_SUCCESS,
} from './types';

import url from '../constants/url';

export function getUserObjectives(token) {
  const request = Request.get(`${url}/objectives`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .accept('application/tuniversidad.v1')
    .withCredentials();
  return (dispatch) => {
    dispatch({
      type: OBJECTIVES_REQUEST,
    });
    return request
      .then((res) => {
        if (res.ok) {
          dispatch({
            type: OBJECTIVES_SUCCESS,
            objectives: res.body,
          });
        }
      })
      .catch(() => dispatch({ type: OBJECTIVES_FAILURE }));
  };
}


export function updateUserObjectives(token, language, math, history, science) {

  const values = [language, math, history, science].map((score, index) => {
    return {
      objective: {
        score,
        subject_id: index + 1,
      },
    };
  });

  const request = Request.post(`${url}/objectives`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send(values)
    .accept('application/tuniversidad.v1')
    .withCredentials();

  return (dispatch) => {
    dispatch({
      type: OBJECTIVES_REQUEST,
    });
    return request
      .then((res) => {
        if (res.ok) {
          dispatch({
            type: OBJECTIVES_SUCCESS,
            objectives: res.body,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: OBJECTIVES_FAILURE,
        });
      });
  };
}
