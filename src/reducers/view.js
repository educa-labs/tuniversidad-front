import { CHANGE_VIEW } from '../actions/types';

const initialState = 1;

function view(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VIEW: return action.value;
    default: return state;
  }
}

export default view;
