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

export function getCampus(id, token) {
  return Request.get(`${url}/universities/${id}/campus`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .accept('application/tuniversidad.v1')
      .withCredentials();
}

export function rutIsAviable(rut) {
  return Request.get(`/validate_rut?rut=${rut}`)
      .set('Content-Type', 'application/json')
      .accept('application/tuniversidad.v1')
      .withCredentials();
}
