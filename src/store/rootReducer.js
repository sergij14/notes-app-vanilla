export function rootReducer(state, action) {
  const notes = state.notes || [];
  switch (action.type) {
    case 'SAVE_NOTE':
      return {
        ...state, notes: [...notes, action.payload],
      };

    default:
      return state;
  }
}
