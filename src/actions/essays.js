import Request from 'superagent';
import {
  ESSAY_REQUEST,
  ESSAY_FAILURE,
  GET_ESSAYS,
  ADD_ESSAY,
  REMOVE_ESSAY,
} from './types';
import url from '../constants/url';

export function getEssays(token, id) {
  const request = Request.get(`${url}/progress`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .query({ subject_id: id })
    .accept('application/tuniversidad.v1')
    .withCredentials();

  return (dispatch) => {
    dispatch({
      type: ESSAY_REQUEST,
    });
    return request
      .then((res) => {
        if (res.ok) {
          dispatch({
            type: GET_ESSAYS,
            essays: res.body,
            id,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: ESSAY_FAILURE,
        });
      });
  };
}


export function addEssay(token, title, subjectId, score, dateFull) {
  const request = Request.post(`${url}/essays`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .accept('application/tuniversidad.v1')
    .withCredentials()
    .send({
      essay: {
        subject_id: subjectId,
        score,
        title,
        date_full: dateFull,
      },
    });
  return (dispatch) => {
    dispatch({
      type: ESSAY_REQUEST,
    });
    return request
      .then((res) => {
        if (res.ok) {
          dispatch({
            type: ADD_ESSAY,
            id: subjectId,
          });
        }
      })
      .catch(() => dispatch({ type: ESSAY_FAILURE }));
  };
}

export function removeEssay(token, essayId, subjectId) {
  const request = Request.delete(`${url}/essays/${essayId}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .accept('application/tuniversidad.v1')
    .withCredentials();

  return (dispatch) => {
    dispatch({
      type: ESSAY_REQUEST,
    });
    return request
      .then((res) => {
        if (res.ok) {
          dispatch({
            type: REMOVE_ESSAY,
            id: subjectId,
          });
        }
      })
      .catch(() => dispatch({ type: ESSAY_FAILURE }));
  };
}
