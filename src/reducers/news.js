import {
  NEWS_FAILURE,
  NEWS_REQUEST,
  NEWS_SUCCESS,
} from '../actions/types';

const initialState = {
  news: null,
  requesting: false,
  error: null,
};

function news(state = initialState, action) {
  switch (action.type) {
    case NEWS_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
      });
    case NEWS_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        requesting: false,
      });
    case NEWS_SUCCESS:
      return Object.assign({}, state, {
        news: action.news,
        requesting: false,
        error: null,
      });
    default: return state;
  }
}

export default news;

