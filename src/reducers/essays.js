import _ from 'lodash';
import {
  ESSAY_REQUEST,
  ADD_ESSAY,
  REMOVE_ESSAY,
  GET_ESSAYS,
} from '../actions/types';

const initialState = {
  1: null,
  2: null,
  3: null,
  4: null,
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
        [action.id]: action.essays,
        requesting: false,
      });
    case ADD_ESSAY:
    console.log(action)
    console.log(state)
      return Object.assign({}, state, {
        [action.id]: Object.assign({}, state[action.id])
        requesting: false,
      });

    case REMOVE_ESSAY:
      return Object.assign({}, state, {
        [action.id]: _.filter(state[action.id], ess => ess.id !== action.essay_id),
        requesting: false,
      });
    default: return state;
  }
}

export default essays;
