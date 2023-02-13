import './styles/index.css';
import {App} from './components/app/app.component';
import {Header} from './components/header/header.component';
import {NotesList} from './components/notes-list/notes-list.component';

const app = new App('#root', {
  components: [Header, NotesList],
});

app.render();
