import { SELECT_ESSAY, SELECT_TAB } from '../actions/types';

const initialState = {
  tab: 1,
  essay: 1,
};

function profileNavigation(state = initialState, action) {
  switch (action.type) {
    case SELECT_ESSAY:
      return Object.assign({}, state, {
        essay: action.essay,
      });
    case SELECT_TAB:
      return Object.assign({}, state, {
        tab: action.tab,
      });
    default: return state;
  }
}

export default profileNavigation;

