import {
  OBJECTIVES_FAILURE,
  OBJECTIVES_REQUEST,
  GET_OBJECTIVES,
  UPDATE_OBJECTIVES,
  CLEAR_STATE,
} from '../actions/types';

const initalState = {
  objectives: null,
  requesting: false,
  shouldFetch: false,
};

function objectives(state = initalState, action) {
  switch (action.type) {
    case OBJECTIVES_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
      });
    case OBJECTIVES_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
      });
    case GET_OBJECTIVES:
      return Object.assign({}, state, {
        objectives: action.objectives,
        requesting: false,
        shouldFetch: false,
      });
    case UPDATE_OBJECTIVES:
      return Object.assign({}, state, {
        shouldFetch: true,
        requesting: false,
      });
    case CLEAR_STATE: return initalState;
    default: return state;
  }
}

export default objectives;
