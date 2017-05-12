import { SHOW_LOGIN } from '../actions/types';

const initialState = false;

export default function showLogin(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOGIN:
      return !state;
    default: return state;
  }
}

