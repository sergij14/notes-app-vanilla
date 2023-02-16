const deleteIDFromSelected = (selected, idToDelete) => [...selected.filter((id) => id !== idToDelete)];

export function rootReducer(state, action) {
  const notes = {...state.notes};
  let selected = [...state.selected];

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
      delete notes[action.payload];
      if (selected.includes(action.payload)) {
        selected = deleteIDFromSelected(selected, action.payload);
      }
      return {
        ...state,
        notes: {...notes},
        selected: [...selected],
      };

    case 'DELETE_SELECTED_NOTES':
      selected.forEach((id) => {
        delete notes[id];
        if (selected.includes(id)) {
          selected = deleteIDFromSelected(selected, id);
        }
      });
      return {
        ...state,
        notes: {...notes},
        selected: [...selected],
      };

    case 'SELECT_NOTE':
      return {
        ...state,
        selected: [...selected, action.payload],
      };

    case 'UNSELECT_NOTE':
      return {
        ...state,
        selected: deleteIDFromSelected(selected, action.payload),
      };

    default:
      return state;
  }
}
