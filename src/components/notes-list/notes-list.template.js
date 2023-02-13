export function getNotesListTemplate(notes) {
  return notes.map(
      ({title, description, id}) =>
        `
            <div class="p-4 rounded-lg shadow-lg bg-white">
                <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">${title}</h5>
                <p class="text-gray-700 text-base mb-4">
                    ${description}
                </p>
            </div>
        `
  ).join('');
}
