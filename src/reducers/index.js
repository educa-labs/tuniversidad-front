import { combineReducers } from 'redux';
import user from './user';
import compress from './compress';
import filter from './filter';
import favs from './favs';
import compare from './compare';

export default combineReducers({
  user,
  compress,
  filter,
  favs,
  compare,
});
