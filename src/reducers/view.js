import { CHANGE_VIEW, COMPRESS } from '../actions/types';

const initialState = {
  view: 1,
  compress: false
};

function view(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VIEW:
      return {
        ...state,
        view: action.view,
      };
    case COMPRESS:
      return {
        ...state,
        compress: !state.compress,
      };
    default: return state;
  }
}

export default view;
