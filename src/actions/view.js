import { CHANGE_VIEW, COMPRESS } from './types';

export function changeView(view) {
  return {
    type: CHANGE_VIEW,
    view,
  };
}

export function toggleCompress() {
  return {
    type: COMPRESS,
  };
}
