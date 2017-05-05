import {
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from '../actions/types';

const initialState = {
  result: null,
  requesting: false,
  error: {},
};

function fetch(state = initialState, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
      });
    case FETCH_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        error: action.error,
      });
    case FETCH_SUCCESS:
      return Object.assign({}, state, {
        result: action.payload,
        requesting: false,
        error: {},
      });
    default: return state;
  }
}

export default fetch;
