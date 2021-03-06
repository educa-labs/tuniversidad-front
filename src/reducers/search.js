import is from 'is_js';
import {
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  POPULAR_SUCCESS,
  INFINITE_REQUEST,
  INFINITE_SUCCESS,
  MAKE_SUBMIT,
  CLEAR_SEARCH,
  CLEAR_FILTER_VALUE,
} from '../actions/types';
import { CAREER } from '../constants/strings';

const initalState = {
  result: null,
  hasMore: true,
  popular_careers: [],
  popular_univ: [],
  requesting: false,
  makeSubmit: false,
  afterSearch: false,
  error: {},
};

function search(state = initalState, action) {
  switch (action.type) {
    case CLEAR_FILTER_VALUE:
      return Object.assign({}, state, {
        makeSubmit: true,
      });
    case CLEAR_SEARCH:
      return Object.assign({}, state, {
        result: null,
        hasMore: true,
        afterSearch: false,
      });
    case MAKE_SUBMIT:
      return Object.assign({}, state, {
        makeSubmit: true,
      });
    case INFINITE_REQUEST:
      return Object.assign({}, state, {
        infiniteLoading: true,
      });
    case SEARCH_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
      });
    case SEARCH_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        error: action.error,
        afterSearch: true,
      });
    case SEARCH_SUCCESS:
      return Object.assign({}, state, {
        result: action.payload,
        requesting: false,
        current_page: 2,
        makeSubmit: false,
        hasMore: is.not.empty(action.payload),
        afterSearch: true,
        error: {},
      });
    case INFINITE_SUCCESS:
      return Object.assign({}, state, {
        result: [...state.result, ...action.payload],
        hasMore: is.not.empty(action.payload),
        current_page: state.current_page + 1,
        afterSearch: true,
        error: {},
      });
    case POPULAR_SUCCESS:
      if (action.active === CAREER) {
        return Object.assign({}, state, {
          popular_careers: action.payload,
          requesting: false,
          hasMore: false,
          error: {},
        });
      }
      return Object.assign({}, state, {
        popular_univ: action.payload,
        requesting: false,
        hasMore: false,
        error: {},
      });
    default: return state;
  }
}

export default search;
