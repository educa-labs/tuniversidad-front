import Request from 'superagent';
import {
  GET_GOALS,
  ADD_GOAL,
  REMOVE_GOAL,
  GOAL_REQUEST,
  GOAL_FAILURE,
} from './types';
import url from '../constants/url';


export function getGoals(token) {
  const request = Request.get(`${url}/goals`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .accept('application/tuniversidad.v1')
    .withCredentials();

  return (dispatch) => {
    dispatch({
      type: GOAL_REQUEST,
    });
    return request
      .then((res) => {
        if (res.ok) {
          dispatch({
            type: GET_GOALS,
            goals: res.body,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GOAL_FAILURE,
          error: err.response.body,
        });
      });
  };
}

export function addGoal(id, token) {
  const request = Request.post(`${url}/goals`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .accept('application/tuniversidad.v1')
    .withCredentials()
    .send({
      carreer: {
        id,
      },
    });
  return (dispath) => {
    dispath({
      type: GOAL_REQUEST,
    });
    return request
      .then((res) => {
        if (res.ok) {
          dispath({
            type: ADD_GOAL,
            goal: res.body,
          });
        }
      })
      .catch((err) => {
        dispath({
          type: GOAL_FAILURE,
          error: err.response.body,
        });
      });
  };
}
