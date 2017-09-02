import {
  FETCH_FAILURE,
  FETCH_SUCCESS,
  FETCH_REQUEST,
} from '../actions/types';

const initialState = {
  university: null,
  career: null,
  types: null,
  areas: null,
  schedules: null,
  regions: null,
  cities: null,
  subjects: null,
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
        [action.key]: action.payload,
        requesting: false,
        error: {},
      });
    default: return state;
  }
}

export default fetch;
