import {
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  POPULAR_SUCCESS,
} from '../actions/types';

const initalState = {
  result: null,
  requesting: false,
  error: {},
};

function search(state = initalState, action) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
      });
    case SEARCH_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        error: action.error,
      });
    case SEARCH_SUCCESS:
      return Object.assign({}, state, {
        result: action.payload,
        requesting: false,
        error: {},
      });
    case POPULAR_SUCCESS:
      return Object.assign({}, state, {
        popular: action.payload,
        requesting: false,
        error: {},
      });
    default: return state;
  }
}

export default search;
