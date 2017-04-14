import {
  LOG_USER_REQUEST,
  LOG_USER_SUCCESS,
  LOG_USER_FAILURE,
} from '../actions/types';

const initialState = {
  currentUser: null,
  requesting: false,
  error: null,
};

function user(state = initialState, action) {
  switch (action.type) {
    case LOG_USER_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
      });
    case LOG_USER_SUCCESS:
      return Object.assign({}, state, {
        currentUser: action.user,
        requesting: false,
        error: null,
      });
    case LOG_USER_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        error: action.error,
      });
    default: return state;
  }
}

export default user;
