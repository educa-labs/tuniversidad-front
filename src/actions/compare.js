import { ADD_COMPARE, REMOVE_COMPARE } from './types';

export function addToCompare(id) {
  return {
    type: ADD_COMPARE,
    id,
  };
}

export function removeFromCompare(id) {
  return {
    type: REMOVE_COMPARE,
    id,
  };
}
