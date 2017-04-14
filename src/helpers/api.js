import Request from 'superagent';

export function logUser(email, password) {
  return Request.post('/sessions')
    .set('Content-Type', 'application/json')
    .send({ session: {
      email,
      password,
    } });
}
