import {
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  POPULAR_SUCCESS,
  INFINITE_REQUEST,
  INFINITE_SUCCESS,
  MAKE_SUBMIT,
} from '../actions/types';

const initalState = {
  result: null,
  hasMore: true,
  popular_careers: [],
  popular_univ: [],
  requesting: false,
  makeSubmit: false,
  error: {},
};

function search(state = initalState, action) {
  switch (action.type) {
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
      });
    case SEARCH_SUCCESS:
      return Object.assign({}, state, {
        result: action.payload,
        requesting: false,
        hasMore: true,
        current_page: 2,
        makeSubmit: false,
        error: {},
      });
    case INFINITE_SUCCESS:
      return Object.assign({}, state, {
        result: [...state.result, ...action.payload],
        hasMore: action.payload !== [],
        current_page: state.current_page + 1,
        error: {},
      });
    case POPULAR_SUCCESS:
      if (action.active === 'carreers') {
        return Object.assign({}, state, {
          popular_careers: action.payload,
          requesting: false,
          error: {},
        });
      }
      return Object.assign({}, state, {
        popular_univ: action.payload,
        requesting: false,
        error: {},
      });
    default: return state;
  }
}

export default search;
