import { SET_ACTIVE_FILTER, CHANGE_FILTER_VALUE, CLEAR_SEARCH, CLEAR_FILTER_VALUE } from '../actions/types';

const initialState = {
  page: 0,
  active: 'carreer',
  university_type: null,
  university: null,
  freeness: null,
  cities: null,
  region_id: null,
  area: null,
  duration: { min: 1, max: 16 },
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
    case CLEAR_FILTER_VALUE:
    case CHANGE_FILTER_VALUE:
      return Object.assign({}, state, {
        [action.filter]: action.value,
      });
    case CLEAR_SEARCH:
      return Object.assign(initialState, {
        active: state.active,
      });
    default: return state;
  }
}

export default filter;
