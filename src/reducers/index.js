import { combineReducers } from 'redux';
import user from './user';
import showLogin from './show';
import filter from './filter';
import goals from './goals';
import compare from './compare';
import fetch from './fetch';
import search from './search';

export default combineReducers({
  user,
  showLogin,
  filter,
  goals,
  compare,
  fetch,
  search,
});
