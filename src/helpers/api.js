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
  return Request.get(`${url}/validate_rut?rut=${rut}`)
      .set('Content-Type', 'application/json')
      .accept('application/tuniversidad.v1')
      .withCredentials()
      .then(res => new Promise((resolve, reject) => {
        if (!res.body.valid) reject({ rut: res.body.error });
        resolve({});
      }),
      );
}

export function getCover(id, token) {
  return Request.get(`${url}/universities/${id}?image=true`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .accept('application/tuniversidad.v1')
    .withCredentials();
}

export function getCareerCover(id) {
  return Request.get(`${url}/areas/${id}`)
    .set('Content-Type', 'application/json')
    .accept('application/tuniversidad.v1')
    .withCredentials();
}

export function getNewsPhoto(id, token) {
  return Request.get(`${url}/news/${id}?image=true`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .accept('application/tuniversidad.v1')
    .withCredentials();
}

export function getCareerCampus(id, token) {
  return Request.get(`${url}/campus/${id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .accept('application/tuniversidad.v1')
    .withCredentials();
}

export function getPrediction(subId, token) {
  return Request.get(`${url}/prediction/${subId}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .accept('application/tuniversidad.v1')
    .withCredentials()
    .then(res => res.body);
}

export function getSimilarCareers(id) {
  return Request.get(`${url}/similar?carreer_id=${id}&k=9`)
    .set('Content-Type', 'application/json')
    .accept('application/tuniversidad.v1')
    .withCredentials();
}
