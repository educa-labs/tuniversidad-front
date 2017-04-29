import {
  LOG_USER_REQUEST,
  LOG_USER_SUCCESS,
  LOG_USER_FAILURE,
  SIGN_USER_REQUEST,
  SIGN_USER_SUCCESS,
  SIGN_USER_FAILURE,
  CLEAR_STATE
} from '../actions/types';

const initialState = {
  currentUser: null,
  requesting: false,
  error: {},
};

function user(state = initialState, action) {
  switch (action.type) {
    case LOG_USER_REQUEST:
    case SIGN_USER_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
      });
    case LOG_USER_FAILURE:
    case SIGN_USER_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        error: action.error,
      });
    case LOG_USER_SUCCESS:
      return Object.assign({}, state, {
        currentUser: action.user,
        requesting: false,
        error: {},
      });
    case SIGN_USER_SUCCESS:
      return Object.assign({}, state, {
        requesting: false,
        error: {},
      });
    case CLEAR_STATE:
      return Object.assign({}, state, {
        error: {},
        requesting: false,
      });
    default: return state;
  }
}

export default user;
