import Request from 'superagent';
import {
  OBJECTIVES_FAILURE,
  OBJECTIVES_REQUEST,
  GET_OBJECTIVES,
  UPDATE_OBJECTIVES,
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
        const objectives = Object.assign({
          language: res.body[1],
          math: res.body[2],
          history: res.body[3],
          science: res.body[4],
        });
        if (res.ok) {
          dispatch({
            type: GET_OBJECTIVES,
            objectives,
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
          dispatch({ type: UPDATE_OBJECTIVES });
        }
      })
      .catch(() => {
        dispatch({
          type: OBJECTIVES_FAILURE,
        });
      });
  };
}
