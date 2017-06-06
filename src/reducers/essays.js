import _ from 'lodash';
import {
  ESSAY_REQUEST,
  ADD_ESSAY,
  REMOVE_ESSAY,
  GET_ESSAYS,
} from '../actions/types';

const initialState = {
  essays: null,
  requesting: false,
  error: {},
};

function essays(state = initialState, action) {
  switch (action.type) {
    case ESSAY_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
      });
    case GET_ESSAYS:
      return Object.assign({}, state, {
        essays: Object.assign({}, state.essays, {
          [action.id]: action.essays,
        }),
        requesting: false,
        error: {},
      });
    case ADD_ESSAY:
      return Object.assign({}, state, {
        essays: Object.assign({}, state.essays, {
          [action.id]: [...state.essays[action.id], action.essay],
        }),
        requesting: false,
      });
    case REMOVE_ESSAY:
      return Object.assign({}, state, {
        essay: _.filter(state.essays, ess => ess.id !== action.id),
        requesting: false,
      });
    default: return state;
  }
}

export default essays;
