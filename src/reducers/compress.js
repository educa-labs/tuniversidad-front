import { COMPRESS } from '../actions/types';

const initialState = false;

function view(state = initialState, action) {
  switch (action.type) {
    case COMPRESS:
      return !state;

    default: return state;
  }
}

export default view;
