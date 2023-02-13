export function getNoteFormTemplate() {
  return `
    <div data-type="note-form-overlay" class="bg-gray-200 bg-opacity-80 px-4 absolute inset-0 flex z-50 hidden">
        <form class="self-center mx-auto w-full max-w-lg bg-white rounded-md p-4">
          <div data-type="note-form-error"></div>
          <div data-type="note-form-fields" class="flex flex-col space-y-4"></div>
        </form>
    </div>
    `;
}
