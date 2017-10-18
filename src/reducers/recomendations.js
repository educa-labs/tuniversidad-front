import {
  RECOMENDATIONS_FAILURE,
  RECOMENDATIONS_REQUEST,
  RECOMENDATIONS_SUCCESS,
  LIKE_RECOMENDATION,
  UNLIKE_RECOMENDATION,
} from '../actions/types';

const initialState = {
  recomends: null,
  history: null,
  requesting: false,
  error: null,
};

function recomends(state = initialState, action) {
  switch (action.type) {
    case RECOMENDATIONS_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
      });
    case RECOMENDATIONS_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
      });
    case RECOMENDATIONS_SUCCESS:
      return Object.assign({}, state, {
        recomends: action.payload,
        requesting: false,
      });
    case UNLIKE_RECOMENDATION:
    case LIKE_RECOMENDATION:
      return Object.assign({}, state, {
        recomends: state.recomends.filter(req => req.id !== action.payload),
        requesting: false,
      });
    default: return state;
  }
}

export default recomends;

