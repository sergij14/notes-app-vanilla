export function getHeaderTemplate() {
  return `
    <h1 class="text-blue-400 text-2xl first-letter:text-blue-600 font-black">Notes App</h1>
    <div class="flex space-x-2">
      <button class="form-delete-btn hidden" data-type="note-delete-btn">Delete Selected</button>
      <button class="form-primary-btn" data-type="note-form-btn">Create Note</button>
    </div>
    `;
}
