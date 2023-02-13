export function getNoteFormTemplate(data) {
  return `
    <div data-type="note-form-overlay" class="bg-gray-200 bg-opacity-80 px-4 absolute inset-0 flex z-50 hidden">
        <form class="flex flex-col self-center mx-auto space-y-4 w-full max-w-lg bg-white rounded-md p-4">
        </form>
    </div>
    `;
}
