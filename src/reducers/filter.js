import { SET_ACTIVE_FILTER, CHANGE_FILTER_VALUE } from '../actions/types';

const initialState = {
  active: 'carreer',
  university_type: null,
  freeness: null,
  cities: null,
  region_id: null,
  area: null,
  duration: { min: 1, max: 14 },
  price: { min: 0, max: 7000000 },
  cut: { min: 450, max: 850 },
  schedule: null,
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
