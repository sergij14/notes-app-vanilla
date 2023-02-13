import './styles/index.css';
import {App} from './components/app/app.component';
import {HeaderForm} from './components/header-form/header-form.component';
import {NotesList} from './components/notes-list/notes-list.component';

const app = new App('#root', {
  components: [HeaderForm, NotesList],
});

app.render();
