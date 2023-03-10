import {createStore} from '../core/store.core';
import {storage} from '../core/utils.core';
import {rootReducer} from './rootReducer';

const defaultState = {
  notes: {},
  selected: [],
};

const initialState = storage('notes-app-store') ?
  storage('notes-app-store') :
  defaultState;

export const store = createStore(rootReducer, initialState);

store.subscribe((state) => {
  console.log(state);
  storage('notes-app-store', state);
});
