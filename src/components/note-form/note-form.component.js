import {AppComponent} from '../../core/app-component.core';
import {Form} from '../../core/form.core';
import {getNoteFormTemplate} from './note-form.template';

export class NoteForm extends AppComponent {
  static cn = 'app-note-form';

  constructor($root, options) {
    super($root, {
      name: 'NoteForm',
      listeners: ['mousedown'],
      ...options,
    });
    this.options = options;

    this.noteToEdit = {};
    this.$formOverlay = null;
  }

  init() {
    super.init();

    const formFields = {
      title: {
        cn: 'form-input',
        placeholder: 'Note title',
      },
      description: {
        cn: 'form-input',
        placeholder: 'Note description',
        tag: 'textarea',
        selfClosing: false,
      },
    };

    this.$formOverlay = this.$root.findByDataType('note-form-overlay');
    this.form = new Form(this.$formOverlay, this.options);
    this.form.init();
    this.form.renderFields(formFields);

    this.$subscribe('notes-list: edit-note', (noteID) => {
      this.openForm(noteID);
    });
    this.$subscribe('header: create-note', () => {
      this.openForm();
    });
  }

  toHTML() {
    return getNoteFormTemplate();
  }

  openForm(noteID) {
    this.noteToEdit = this.store.getState().notes[noteID];

    console.log(this.noteToEdit);
    this.$formOverlay.removeClass('hidden');
  }

  onMousedown(evt) {
    const {type} = evt.target.dataset;

    if (type === 'note-form-btn') {
      this.openForm();
    }

    if (type === 'note-form-overlay') {
      this.closeForm();
    }
  }

  closeForm() {
    this.$formOverlay.addClass('hidden');
  }
}
