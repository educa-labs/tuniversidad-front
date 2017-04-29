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
    .set('Content-Type', 'application/json')
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
  const request = Request.post('/users')
    .set('Content-Type', 'application/json')
    .send({
      user: {
        first_name: firstname,
        last_name: lastname,
        email,
        password,
      },
    });
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
        if (err.response.status === 422) {
          dispatch({
            type: SIGN_USER_FAILURE,
            error: err.response.body.errors,
          });
        }
      });
  };
}
