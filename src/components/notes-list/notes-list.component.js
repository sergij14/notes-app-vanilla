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

    this.$notesContainer = this.$root.findByDataType('notes-container');
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

  getPriorityColor(num) {
    if (num >= 7) {
      return 'red';
    }
    if (num >= 4) {
      return 'orange';
    }
    if (num < 4) {
      return 'green';
    }
  }

  renderNotes(notes) {
    const notesToRender = Object.keys(notes).map((key) => notes[key]);

    this.$notesContainer.html(
      notesToRender.length ?
      notesToRender
          .map(
              ({title='', description='', priority='', id=''}) =>
                `
              <div class="px-2 md:px-4 py-6">
                <div class="relative px-4 pb-2 pt-8 rounded-lg shadow-lg bg-white break-words word">
                    <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">${title}</h5>
                    <p class="text-gray-700 text-base mb-4">
                      ${description}
                    </p>
                    <p class="text-gray-700 text-sm text-right">
                      Priority: <span class="font-semibold" style="color: ${this.getPriorityColor(priority)}">${priority}</span>
                    </p>
                    <div class="flex justify-between w-full space-x-2 px-4 absolute -top-1 left-0">
                        <button class="edit-btn" data-id="${id}" data-type="note-edit-btn">Edit</button>
                        <button class="delete-btn" data-id="${id}" data-type="note-delete-btn">x</button>
                    </div>
                </div>
              </div>
        `
          )
          .join('') :
        '<p class="px-2 md:px-4 py-6">No items...</p>'
    );
  }
}
