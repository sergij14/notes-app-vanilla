import {AppComponent} from '../../core/app-component.core';
import {getNotesListTemplate} from './notes-list.template';

const notesData = [
  {
    id: 1,
    title: 'note1',
    description: 'description......',
  },
  {
    id: 1,
    title: 'note2',
    description: 'description......',
  },
];

export class NotesList extends AppComponent {
    static cn = 'app-notes-list'

    toHTML() {
      return getNotesListTemplate(notesData);
    }
}
