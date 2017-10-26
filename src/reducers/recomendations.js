import { combineReducers } from 'redux';
import {
  RECOMENDATIONS_FAILURE,
  RECOMENDATIONS_REQUEST,
  RECOMENDATIONS_SUCCESS,
  LIKE_RECOMENDATION,
  UNLIKE_RECOMENDATION,
  CHANGE_TAB,
  HISTORY_SUCCESS,
} from '../actions/types';


const history = (state = null, action) => {
  switch (action.type) {
    case HISTORY_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const error = (state = false, action) => {
  switch (action.type) {
    case RECOMENDATIONS_FAILURE:
      return true;
    case CHANGE_TAB:
    case RECOMENDATIONS_SUCCESS:
      return false;
    default:
      return state;
  }
};

const requesting = (state = false, action) => {
  switch (action.type) {
    case RECOMENDATIONS_SUCCESS:
    case RECOMENDATIONS_REQUEST:
      return true;
    case LIKE_RECOMENDATION:
    case UNLIKE_RECOMENDATION:
    case RECOMENDATIONS_FAILURE:
    default:
      return false;
  }
};

const recomends = (state = null, action) => {
  switch (action.type) {
    case RECOMENDATIONS_SUCCESS:
      return action.payload;
    case UNLIKE_RECOMENDATION:
    case LIKE_RECOMENDATION:
      return state.filter(req => req.id !== action.payload);
    default:
      return state;
  }
};

const currentTab = (state = 0, action) => {
  switch (action.type) {
    case CHANGE_TAB:
      return action.payload;
    default:
      return state;
  }
};

const essays = (state = null, action) => {
  switch (action.type) {
    case RECOMENDATIONS_SUCCESS:
      return action.essays;
    case RECOMENDATIONS_FAILURE:
      return null;
    default:
      return state;
  }
};

const area = (state = null, action) => {
  switch (action.type) {
    case RECOMENDATIONS_SUCCESS:
      return action.area;
    case RECOMENDATIONS_FAILURE:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  error,
  requesting,
  recomends,
  currentTab,
  history,
  area,
  essays,
});

