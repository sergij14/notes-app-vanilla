export function rootReducer(state, action) {
  const notes = {...state.notes};
  const selected = [...state.selected];

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

    case 'SELECT_NOTE':
      return {
        ...state,
        selected: [...selected, action.payload],
      };

    case 'UNSELECT_NOTE':
      return {
        ...state,
        selected: [...selected.filter((id) => id !== action.payload)],
      };

    default:
      return state;
  }
}
