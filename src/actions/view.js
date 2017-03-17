import { CHANGE_VIEW } from './types';

export function changeView(value) {
  return {
    type: CHANGE_VIEW,
    value,
  };
}
