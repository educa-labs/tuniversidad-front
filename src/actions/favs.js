import { ADD_FAVORITE, REMOVE_FAVORITE } from './types';

export function addToFavorites(id) {
  return {
    type: ADD_FAVORITE,
    id,
  };
}

export function removeFromFavorites(id) {
  return {
    type: REMOVE_FAVORITE,
    id,
  };
}
