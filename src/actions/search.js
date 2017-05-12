import Request from 'superagent';
import {
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
} from './types';

import url from '../constants/url';

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
