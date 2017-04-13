import { COMPRESS, SHOW_LOGIN } from '../actions/types';

const initialState = false;

export function compress(state = initialState, action) {
  switch (action.type) {
    case COMPRESS:
      return !state;
    default: return state;
  }
}

export function showLogin(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOGIN:
      return !state;
    default: return state;
  }
}

