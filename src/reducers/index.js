import { combineReducers } from 'redux';
import user from './user';
import view from './view';
import filter from './filter';
import favs from './favs';
import compare from './compare';

export default combineReducers({
  user,
  view,
  filter,
  favs,
  compare,
});
