import Request from 'superagent';
import {
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  POPULAR_SUCCESS,
  INFINITE_REQUEST,
  INFINITE_SUCCESS,
  MAKE_SUBMIT,
  CLEAR_SEARCH,
} from './types';
import { CAREER, UNIVERSITY } from '../constants/strings';

import url from '../constants/url';

export function makeSubmit() {
  return {
    type: MAKE_SUBMIT,
  };
}

export function clearSearch() {
  return {
    type: CLEAR_SEARCH,
  };
}

export function search(active, text, token, filters) {
  const request = Request.post(`${url}/search/`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .accept('application/tuniversidad.v1')
    .withCredentials()
    .send({
      [active]: {
        text,
        ...filters,
      },
    });
  return (dispath) => {
    dispath({
      type: SEARCH_REQUEST,
    });
    return request
      .then((res) => {
        if (res.ok) {
          dispath({
            type: SEARCH_SUCCESS,
            payload: res.body,
          });
        }
      })
      .catch((err) => {
        dispath({
          type: SEARCH_FAILURE,
          error: err.response.body,
        });
      });
  };
}

export function getNextPage(active, text, token, filters, page) {
  const request = Request.post(`${url}/search/`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .accept('application/tuniversidad.v1')
    .withCredentials()
    .send({
      [active]: {
        text,
        ...filters,
      },
      page,
    });
  return (dispath) => {
    dispath({
      type: INFINITE_REQUEST,
    });
    return request
      .then((res) => {
        if (res.ok) {
          dispath({
            type: INFINITE_SUCCESS,
            payload: res.body,
          });
        }
      })
      .catch((err) => {
        dispath({
          type: SEARCH_FAILURE,
          error: err.response.body,
        });
      });
  };
}
export function getMostPopular(active, token) {
  const field = active === CAREER ? 'carreers' : 'universities';
  const request = Request.get(`${url}/popular/${field}`)
    .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .accept('application/tuniversidad.v1')
      .withCredentials();
  
  return (dispath) => {
    dispath({
      type: SEARCH_REQUEST,
    });
    return request
      .then((res) => {
        if (res.ok) {
          dispath({
            type: POPULAR_SUCCESS,
            payload: res.body,
            active,
          });
        }
      })
      .catch((err) => {
        dispath({
          type: SEARCH_FAILURE,
          error: err.response.body,
        });
      });
  };
}
