import './styles/index.css';
import {App} from './components/app/app.component';
import {HeaderForm} from './components/header-form/header-form.component';
import {NotesList} from './components/notes-list/notes-list.component';
import {createStore} from './core/store.core';
import {rootReducer} from './store/rootReducer';

const store = createStore(rootReducer);
const app = new App('#root', {
  components: [HeaderForm, NotesList],
  store,
});

app.render();
