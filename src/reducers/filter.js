import { SET_ACTIVE_FILTER, CHANGE_FILTER_VALUE } from '../actions/types';

const initialState = {
  active: 'university',
  type: 0,
  gratuity: 0,
  city: 0,
  region: 0,
  area: 0,
  language: 0,
  duration: [1, 14],
  tariff: [0, 1000000],
  cut: [450, 850],
  schedule: 0,
};

function filter(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_FILTER:
      return Object.assign({}, state, {
        active: action.active,
      });
    case CHANGE_FILTER_VALUE:
      return Object.assign({}, state, {
        [action.filter]: action.value,
      });
    default: return state;
  }
}

export default filter;
