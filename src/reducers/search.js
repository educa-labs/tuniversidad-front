import {
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  POPULAR_SUCCESS,
  INFINITE_REQUEST,
  INFINITE_SUCCESS,
} from '../actions/types';

const initalState = {
  result: null,
  current_page: 1,
  popular_careers: [],
  popular_univ: [],
  requesting: false,
  infiniteLoading: false,
  error: {},
};

function search(state = initalState, action) {
  switch (action.type) {
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
        current_page: 2,
        error: {},
      });
    case INFINITE_SUCCESS:
      return Object.assign({}, state, {
        result: [...state.result, ...action.payload],
        current_page: state.current_page + 1,
        infiniteLoading: false,
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
