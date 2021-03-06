import {
  LOG_USER_REQUEST,
  LOG_USER_SUCCESS,
  LOG_USER_FAILURE,
  SIGN_USER_REQUEST,
  SIGN_USER_SUCCESS,
  SIGN_USER_FAILURE,
  CLEAR_STATE,
  CLEAR_ERROR,
  SETUP_USER,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from '../actions/types';

const initialState = {
  currentUser: null,
  requesting: false,
  error: {},
};

function user(state = initialState, action) {
  switch (action.type) {
    case LOG_USER_REQUEST:
    case LOGOUT_USER_REQUEST:
    case SIGN_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
      });
    case LOG_USER_FAILURE:
    case LOGOUT_USER_FAILURE:
    case SIGN_USER_FAILURE:
    case UPDATE_USER_FAILURE:
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
    case LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, {
        currentUser: null,
        requesting: false,
        error: {},
      });
    case UPDATE_USER_SUCCESS:
    case SIGN_USER_SUCCESS:
      return Object.assign({}, state, {
        currentUser: action.user,
        requesting: false,
        error: {},
      });
    case SETUP_USER:
      return Object.assign({}, state, {
        currentUser: action.user,
      });
    case CLEAR_STATE: return initialState;
    case CLEAR_ERROR:
      return Object.assign({}, state, {
        error: {},
      });
    default: return state;
  }
}

export default user;
