import Request from 'superagent';
import {
  LOG_USER_REQUEST,
  LOG_USER_SUCCESS,
  LOG_USER_FAILURE,
  SIGN_USER_REQUEST,
  SIGN_USER_SUCCESS,
  SIGN_USER_FAILURE,
  CLEAR_STATE,
} from './types';

import url from '../constants/url';

export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

export function logUser(email, password) {
  const request = Request.post(`${url}/sessions`)
    .set('Content-Type', 'application/json')
    .accept('application/tuniversidad.v1')
    .withCredentials()
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
        dispatch({
          type: LOG_USER_FAILURE,
          error: err.response.body,
        });
      });
  };
}

export function signUser(firstname, lastname, email, password) {
  console.log(firstname, lastname, email, password);
  const request = Request.post(`${url}/sessions`)
    .set('Content-Type', 'application/json')
    .accept('application/tuniversidad.v1')
    .withCredentials()
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
        dispatch({
          type: SIGN_USER_FAILURE,
          error: err.response.body,
        });
      });
  };
}
