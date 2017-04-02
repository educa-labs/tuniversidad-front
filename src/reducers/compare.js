import is from 'is_js';
import { ADD_COMPARE, REMOVE_COMPARE } from '../actions/types';

const initialState = [];

function compare(state = initialState, action) {
  switch (action.type) {
    case ADD_COMPARE:
      if (is.inArray(action.id, state)) return state;
      return [...state, action.id];
    case REMOVE_COMPARE:
      return state.filter(id => id !== action.id);
    default: return state;
  }
}

export default compare;

