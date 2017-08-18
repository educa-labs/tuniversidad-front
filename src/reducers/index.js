import { combineReducers } from 'redux';
import user from './user';
import filter from './filter';
import goals from './goals';
import compare from './compare';
import fetch from './fetch';
import search from './search';
import essays from './essays';
import objectives from './objectives';
import profileNavigation from './profile';
import news from './news';

export default combineReducers({
  user,
  filter,
  goals,
  compare,
  fetch,
  search,
  essays,
  objectives,
  profileNavigation,
  news,
});
