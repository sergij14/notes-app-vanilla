import {AppComponent} from '../../core/app-component.core';
import {getNotesListTemplate} from './notes-list.template';

export class NotesList extends AppComponent {
  static cn = 'app-notes-list';

  constructor($root, options) {
    super($root, {
      name: 'NotesList',
      listeners: ['click'],
      ...options,
    });
  }

  init() {
    super.init();

    this.$notesContainer = this.$root.find('[data-type=\'notes-container\']');
    this.renderNotes(this.store.getState().notes);
    this.$storeSubscribe((state) => {
      this.renderNotes(state.notes);
    });
  }

  toHTML() {
    return getNotesListTemplate();
  }

  onClick(evt) {
    const {type, id} = evt.target.dataset;

    if (type === 'note-edit-btn') {
      this.$emit('notes-list: edit-note', id);
    }

    if (type === 'note-delete-btn') {
      this.$storeDispatch({
        type: 'DELETE_NOTE',
        payload: id,
      });
    }
  }

  renderNotes(notes) {
    this.$notesContainer.html(
        notes
            .map(
                ({title, description, id}) =>
                  `
              <div class="px-2 md:px-4 py-6">
                <div class="p-4 rounded-lg shadow-lg bg-white">
                    <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">${title}</h5>
                    <p class="text-gray-700 text-base mb-4">
                        ${description}
                    </p>
                    <div class="flex space-x-2">
                        <button class="edit-btn" data-id="${id}" data-type="note-edit-btn">Edit</button>
                        <button class="delete-btn" data-id="${id}" data-type="note-delete-btn">Delete</button>
                    </div>
                </div>
              </div>
        `
            )
            .join('')
    );
  }
}
