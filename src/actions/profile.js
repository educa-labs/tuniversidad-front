import { SELECT_ESSAY, SELECT_TAB } from './types';

export function selectTab(tab) {
  return {
    type: SELECT_TAB,
    tab,
  };
}

export function selectEssay(essay) {
  return {
    type: SELECT_ESSAY,
    essay,
  };
}
