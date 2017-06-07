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
      .catch((err) => {
        dispatch({
          type: ESSAY_FAILURE,
          error: err.response.body,
        });
      });
  };
}


export function addEssay(token, title, subjectId, score) {
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
      },
    });
  return (dispatch) => {
    dispatch({
      type: ESSAY_REQUEST,
    });
    return request
      .then((res) => {
        console.log(res);
        if (res.ok) {
          console.log('La request fue buena', ADD_ESSAY);
          dispatch({
            type: ADD_ESSAY,
            essay: res.body,
            id: subjectId,
          });
          console.log('esto está abajo', ADD_ESSAY);
        }
      })
      .catch(() => dispatch({ type: ESSAY_FAILURE }));
  };
}
