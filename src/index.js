import './styles/index.css';
import {App} from './components/app/app.component';
import {Header} from './components/header/header.component';
import {NotesList} from './components/notes-list/notes-list.component';
import {store} from './store';
import {NoteForm} from './components/note-form/note-form.component';

const app = new App('#root', {
  components: [Header, NoteForm, NotesList],
  store,
});

app.render();
