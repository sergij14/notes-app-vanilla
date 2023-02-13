export function getHeaderTemplate() {
  return `
    <h1>Notes App</h1>
    <div>
        <button data-id="note-form-btn">Creaate Note</button>
        <div data-id="note-form-overlay" class="bg-gray-200 bg-opacity-80 absolute inset-0 flex z-50 hidden">
            <form class="flex flex-col self-center mx-auto space-y-4 w-full max-w-lg bg-white rounded-md p-4">
                <input class="form-input" type="text" name="note_title" placeholder="Note title" />
                <textarea class="form-input" name="note_description"></textarea>
                <button class="form-btn self-center" type="submit">Submit</button>
            </form>
        </div>
    </div>
    `;
}
