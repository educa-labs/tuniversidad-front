import is from 'is_js';

export function getUser() {
  const user = localStorage.getItem('user');
  if (is.null(user)) return null;
  return JSON.parse(user);
}

export function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem('user');
}
