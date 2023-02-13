export function rootReducer(state, action) {
  const notes = state.notes || [];
  switch (action.type) {
    case 'SAVE_NOTE':
      return {
        ...state, notes: [...notes, action.payload],
      };

    case 'EDIT_NOTE':
      return {
        ...state, notes: notes.map((note) => {
          if (note.id === action.payload.id) {
            return {
              ...note,
              ...action.payload,
            };
          }
        }),
      };

    default:
      return state;
  }
}
