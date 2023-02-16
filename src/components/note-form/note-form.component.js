import {AppComponent} from '../../core/app-component.core';
import {Form} from '../../core/form.core';
import {generateID} from '../../core/utils.core';
import {getNoteFormTemplate} from './note-form.template';

export class NoteForm extends AppComponent {
  static cn = 'app-note-form';
  static formConfig = [
    {
      name: 'title',
      type: 'text',
      classes: 'form-input',
      placeholder: 'Note title',
    },
    {
      name: 'priority',
      type: 'number',
      classes: 'form-input',
      placeholder: 'Note priority',
    },
    {
      name: 'description',
      type: 'text-area',
      classes: 'form-input',
      placeholder: 'Note description',
    },
  ];

  constructor($root, options) {
    super($root, {
      name: 'NoteForm',
      listeners: ['mousedown'],
      ...options,
    });
    this.options = options;

    this.$formOverlay = null;
  }

  init() {
    super.init();

    this.$formOverlay = this.$root.findByDataType('note-form-overlay');
    this.form = new Form(this.$formOverlay, {
      onFormSubmit: this.onFormSubmit.bind(this),
      formConfig: NoteForm.formConfig,
      ...this.options,
    });
    this.form.init();

    this.$subscribe('notes-list: edit-note', (noteID) => this.openForm(noteID));
    this.$subscribe('header: create-note', () => this.openForm());
  }

  toHTML() {
    return getNoteFormTemplate();
  }

  onFormSubmit(formData) {
    const noteID = formData['id'];

    const action = {
      type: noteID ? 'EDIT_NOTE' : 'SAVE_NOTE',
      payload: {...formData, id: noteID || generateID()},
    };
    this.$storeDispatch(action);
    this.closeForm();
  }

  openForm(noteID) {
    const noteToEdit = this.store.getState().notes[noteID];

    this.form.renderFields(noteToEdit);
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
    this.form.clearForm();
  }
}
