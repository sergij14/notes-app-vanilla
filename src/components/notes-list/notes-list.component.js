import {AppComponent} from '../../core/app-component.core';
import {getNotesListTemplate} from './notes-list.template';

const notesData = [
  {
    id: 1,
    title: 'note1',
    description: 'description......',
  },
  {
    id: 2,
    title: 'note2',
    description: 'description......',
  },
];

export class NotesList extends AppComponent {
  static cn = 'app-notes-list';

  constructor($root, options) {
    super($root, {
      name: 'NotesList',
      listeners: [
        'click',
      ],
      ...options,
    });
  }

  toHTML() {
    return getNotesListTemplate(notesData);
  }

  onClick(evt) {
    const {type, id} = evt.target.dataset;

    if (type === 'note-edit-btn') {
      this.$emit('notes-list: edit-note', id);
    }
  }
}
