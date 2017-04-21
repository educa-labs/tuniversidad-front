import Request from 'superagent';
import {
  LOG_USER_REQUEST,
  LOG_USER_SUCCESS,
  LOG_USER_FAILURE,
  SIGN_USER_REQUEST,
  SIGN_USER_SUCCESS,
  SIGN_USER_FAILURE,
} from './types';

export function logUser(email, password) {
  const request = Request.post('/sessions')
    .set('Contetn-Type', 'application/json')
    .send({
      session: {
        email,
        password,
      },
    });
  return (dispatch) => {
    dispatch({
      type: LOG_USER_REQUEST,
    });
    return request
      .then((res) => {
        if (res.ok) {
          dispatch({
            type: LOG_USER_SUCCESS,
            user: res.body,
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch({
            type: LOG_USER_FAILURE,
            error: err.response.body,
          });
        }
      });
  };
}

export function signUser(firstname, lastname, email, password) {
  console.log(firstname, lastname, email, password);
  const request = Request.post('/users')
    .set('Contetn-Type', 'application/json')
    .send({
      user: {
        firstname,
        lastname,
        email,
        password,
      },
    });
  console.log(request);
  return (dispatch) => {
    dispatch({
      type: SIGN_USER_REQUEST,
    });
    return request
      .then((res) => {
        if (res.ok) {
          dispatch({
            type: SIGN_USER_SUCCESS,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOG_USER_FAILURE,
          error: err.response.body,
        });
      });
  };
}
