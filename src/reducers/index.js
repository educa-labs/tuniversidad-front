import { combineReducers } from 'redux';
import user from './user';
import view from './view';
import filter from './filter';

export default combineReducers({
  user,
  view,
  filter,
});
