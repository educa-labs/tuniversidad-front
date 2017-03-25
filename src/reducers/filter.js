import { SET_ACTIVE_FILTER, CHANGE_FILTER_VALUE } from '../actions/types';

const initialState = {
  active: 0,
  type: 0,
  gratuity: 0,
  country: 1,
  region: 1,
  area: 0,
  language: 0,
  duration: [1, 14],
  tariff: [0, 1000000],
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
