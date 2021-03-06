import _ from 'lodash';
import {
  GOAL_REQUEST,
  GET_GOALS,
  ADD_GOAL,
  REMOVE_GOAL,
  CLEAR_STATE,
} from '../actions/types';

const initialState = {
  goals: null,
  requesting: false,
  error: {},
};

function goals(state = initialState, action) {
  switch (action.type) {
    case GOAL_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
      });
    case GET_GOALS:
      return Object.assign({}, state, {
        goals: action.goals,
        requesting: false,
        error: {},
      });
    case ADD_GOAL:
      return Object.assign({}, state, {
        goals: [...state.goals, action.goal],
        requesting: false,
      });

    case REMOVE_GOAL:
      return Object.assign({}, state, {
        goals: _.filter(state.goals, goal => goal.carreer.id !== action.id),
        requesting: false,
      });
    case CLEAR_STATE: return initialState;
    default: return state;
  }
}

export default goals;
