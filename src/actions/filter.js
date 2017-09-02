import { SET_ACTIVE_FILTER, CHANGE_FILTER_VALUE } from './types';
import { MIN_CUT, MIN_DURATION, MIN_PRICE, MIN_SEMESTERS, MAX_CUT, MAX_DURATION, MAX_PRICE, MAX_SEMESTERS } from '../constants/num';

export function setActiveFilter(active) {
  return {
    type: SET_ACTIVE_FILTER,
    active,
  };
}

export function changeFilterValue(filter, value) {
  return {
    type: CHANGE_FILTER_VALUE,
    filter,
    value,
  };
}

export function clearFilterValue(filter) {
  console.log(filter);
  let value;
  switch (filter) {
    case 'cut': value = { min: MIN_CUT, max: MAX_CUT }; break;
    case 'min_duration': value = MIN_DURATION; break;
    case 'min_price': value = MIN_PRICE; break;
    case 'min_semesters': value = MIN_SEMESTERS; break;
    case 'max_duration': value = MAX_DURATION; break;
    case 'max_price': value = MAX_PRICE; break;
    case 'max_semesters': value = MAX_SEMESTERS; break;
    default: value = null;
  }

  return {
    type: CHANGE_FILTER_VALUE,
    filter,
    value,
  };
}
