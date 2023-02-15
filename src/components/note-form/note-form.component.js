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

    this.$formOverlay = null;

    this.formFields = {
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
  }

  init() {
    super.init();

    this.$formOverlay = this.$root.findByDataType('note-form-overlay');
    this.form = new Form(this.$formOverlay, this.options);
    this.form.init();

    this.$subscribe('notes-list: edit-note', (noteID) => this.openForm(noteID));
    this.$subscribe('header: create-note', () => this.openForm());
    this.$subscribe('form: form-valid', () => this.closeForm());
  }

  toHTML() {
    return getNoteFormTemplate();
  }

  openForm(noteID) {
    const noteToEdit = this.store.getState().notes[noteID];

    this.form.renderFields(this.formFields, noteToEdit);
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
