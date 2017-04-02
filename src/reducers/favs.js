import is from 'is_js';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/types';

const initialState = [];

function favs(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      if (is.inArray(action.id, state)) return state;
      return [...state, action.id];

    case REMOVE_FAVORITE:
      return state.filter(id => id !== action.id);
    default: return state;
  }
}

export default favs;
