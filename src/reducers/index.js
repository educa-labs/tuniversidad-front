import { combineReducers } from 'redux';
import user from './user';
import { compress, showLogin } from './compress';
import filter from './filter';
import favs from './favs';
import compare from './compare';
import fetch from './fetch';

export default combineReducers({
  user,
  compress,
  showLogin,
  filter,
  favs,
  compare,
  fetch,
});
