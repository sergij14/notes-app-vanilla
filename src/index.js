import './styles/index.css';
import {App} from './components/app/app.component';
import {HeaderForm} from './components/header-form/header-form.component';
import {NotesList} from './components/notes-list/notes-list.component';
import {store} from './store';

const app = new App('#root', {
  components: [HeaderForm, NotesList],
  store,
});

app.render();
