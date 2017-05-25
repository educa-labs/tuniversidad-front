import Request from 'superagent';
import url from '../constants/url';

export function getCareers(id, token) {
  return Request.get(`${url}/universities/${id}/carreers`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .accept('application/tuniversidad.v1')
      .withCredentials();
}

export function getCities(id, token) {
  return Request.get(`${url}/regions/${id}/cities`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .accept('application/tuniversidad.v1')
      .withCredentials();
}

export function getGoals(id, token) {
  return Request.get(`${url}/goals`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .accept('application/tuniversidad.v1')
    .withCredentials();
}
