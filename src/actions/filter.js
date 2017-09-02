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
  let value;
  switch (filter) {
    case 'cut': value = { min: MIN_CUT, max: MAX_CUT }; break;
    case 'duration': value = { min: MIN_DURATION, max: MAX_DURATION }; break;
    case 'price': value = { min: MIN_PRICE, max: MAX_PRICE }; break;
    default: value = null;
  }

  return {
    type: CHANGE_FILTER_VALUE,
    filter,
    value,
  };
}
