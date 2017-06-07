import {
  OBJECTIVES_FAILURE,
  OBJECTIVES_REQUEST,
  OBJECTIVES_SUCCESS,
} from '../actions/types';

const initalState = {
  objectives: null,
  requesting: false,
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
    case OBJECTIVES_SUCCESS:
      return Object.assign({}, state, {
        objectives: action.objectives,
        requesting: false,
      });
    default: return state;
  }
}

export default objectives;
