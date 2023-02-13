import {createStore} from '../core/store.core';
import {rootReducer} from './rootReducer';

const initialState = storage('notes-state') ?
  storage('notes-state') :
  {
    notes: [],
  };

console.log(initialState);

export const store = createStore(rootReducer, initialState);

store.subscribe((state) => {
  console.log(state);
  storage('notes-state', state);
});

export function storage(key, data) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}
