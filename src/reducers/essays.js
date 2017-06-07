import _ from 'lodash';
import {
  ESSAY_REQUEST,
  ADD_ESSAY,
  REMOVE_ESSAY,
  GET_ESSAYS,
  ESSAY_FAILURE,
} from '../actions/types';

const initialState = {
  1: null,
  2: null,
  3: null,
  4: null,
  shouldFetch: null,
  requesting: false,
  error: {},
};

function essays(state = initialState, action) {
  switch (action.type) {
    case ESSAY_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
      });
    case ESSAY_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
      });
    case GET_ESSAYS:
      return Object.assign({}, state, {
        [action.id]: action.essays,
        shouldFetch: null,
        requesting: false,
      });
    case ADD_ESSAY:
    case REMOVE_ESSAY:
      return Object.assign({}, state, {
        shouldFetch: action.id,
        requesting: false,
      });
    default: return state;
  }
}

export default essays;
