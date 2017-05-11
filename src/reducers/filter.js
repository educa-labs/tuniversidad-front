import { SET_ACTIVE_FILTER, CHANGE_FILTER_VALUE } from '../actions/types';

const initialState = {
  active: 'university',
  university_type: null,
  freeness: null,
  cities: null,
  region_id: null,
  area: null,
  duration: [1, 14],
  tariff: [0, 1000000],
  cut: [450, 850],
  schedule: '',
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
