import {createStore} from '../core/store.core';
import {storage} from '../core/utils.core';
import {rootReducer} from './rootReducer';

const initialState = storage('notes-state') ?
  storage('notes-state') :
  {
    notes: [],
  };

export const store = createStore(rootReducer, initialState);

store.subscribe((state) => {
  console.log(state);
  storage('notes-state', state);
});
