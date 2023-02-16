import {AppComponent} from '../../core/app-component.core';
import {getNodeByDataType} from '../../core/utils.core';
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
    this.$storeSubscribe(({notes}) => {
      this.renderNotes(notes);
    });
  }

  toHTML() {
    return getNotesListTemplate();
  }

  getIsSelected(id) {
    return this.store.getState().selected.includes(id);
  }

  onClick(evt) {
    const {type, id} = evt.target.dataset;

    if (type === 'note-delete-btn') {
      return this.$storeDispatch({
        type: 'DELETE_NOTE',
        payload: id,
      });
    }

    if (type === 'note-select-input') {
      const isSelected = this.getIsSelected(id);
      return this.$storeDispatch({
        type: isSelected ? 'UNSELECT_NOTE' : 'SELECT_NOTE',
        payload: id,
      });
    }

    const $note = getNodeByDataType(evt.target, 'note');

    if ($note) {
      this.$emit('notes-list: edit-note', $note.dataset.id);
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
                ({title = '', description = '', priority = 0, id = ''}) =>
                  `<div class="app-note-wrapper">
                    <div class="app-note" data-type="note" data-id="${id}">
                      <button class="delete-btn absolute -top-2 -right-2" data-id="${id}" data-type="note-delete-btn">x</button>
                      <input ${this.getIsSelected(id) ? 'checked' : ''} type="checkbox" class="absolute -bottom-1 -left-1 w-4 h-4" data-id="${id}" data-type="note-select-input" />
                      <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2 select-none">${title}</h5>
                      <p class="text-gray-700 text-base mb-4 select-none">
                        ${description}
                      </p>
                      <p class="text-gray-700 text-sm text-right select-none">
                        Priority: <span class="font-semibold" style="color: ${this.getPriorityColor(priority)}">${priority}</span>
                      </p>
                    </div>
                  </div>
            `
            )
            .join('') :
        '<p class="px-2 md:px-4 py-6">No items...</p>'
    );
  }
}
