export function rootReducer(state, action) {
  const notes = {...state.notes} || {};
  switch (action.type) {
    case 'SAVE_NOTE':
      return {
        ...state,
        notes: {...notes, [action.payload.id]: {...action.payload}},
      };

    case 'EDIT_NOTE':
      notes[action.payload.id] = {...action.payload};
      return {
        ...state,
        notes: {...notes},
      };

    case 'DELETE_NOTE':
      delete state.notes[action.payload];
      return {
        ...state,
      };

    default:
      return state;
  }
}
