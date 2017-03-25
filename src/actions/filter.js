import { SET_ACTIVE_FILTER, CHANGE_FILTER_VALUE } from './types';

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
