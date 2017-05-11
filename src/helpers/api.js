import Request from 'superagent';
import url from '../constants/url';

export function getCareers(id, token) {
  return Request.get(`${url}/universities/${id}/carreers`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .accept('application/tuniversidad.v1')
      .withCredentials();
}
