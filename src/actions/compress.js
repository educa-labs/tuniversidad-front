import { COMPRESS, SHOW_LOGIN } from './types';

export function toggleCompress() {
  return {
    type: COMPRESS,
  };
}

export function toggleShowLogin() {
  return {
    type: SHOW_LOGIN,
  };
}
