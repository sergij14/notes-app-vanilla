export function getNotesListTemplate(notes) {
  return notes.map(
      ({title, description, id}) =>
        `
            <div class="p-4 rounded-lg shadow-lg bg-white" data-type="note-${id}">
                <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">${title}</h5>
                <p class="text-gray-700 text-base mb-4">
                    ${description}
                </p>
                <div class="flex space-x-2">
                    <button data-id="note-edit-btn">Edit</button>
                    <button data-id="note-delete-btn">Delete</button>
                </div>
            </div>
        `
  ).join('');
}
