export function getHeaderTemplate() {
  return `
    <h1>Notes App</h1>
    <div class="header-create-note">
        <button data-id="note-form-btn">Creaate Note</button>
        <div data-id="note-form-overlay" class="absolute inset-0 flex z-50 hidden">
            <form class="flex flex-col self-center mx-auto space-y-4 w-full max-w-lg bg-gray-100 rounded-md p-4 border border-gray-400">
                <input type="text" name="note_title" placeholder="Note title" />
                <textarea name="note_description"></textarea>
                <button type="submit" data-id="note-form-submit-btn">Submit</button>
            </form>
        </div>
    </div>
    `;
}
