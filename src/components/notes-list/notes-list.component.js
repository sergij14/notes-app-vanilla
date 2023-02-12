import {AppComponent} from '../../core/app-component.core';

export class NotesList extends AppComponent {
    static cn = 'app-notes-list'

    toHTML() {
      return '<h1>notes-list</h1>';
    }
}
