import {AppComponent} from '../../core/app-component.core';
import {generateID, shallowEqual} from '../../core/utils.core';
import {getNoteFormTemplate} from './note-form.template';

export class NoteForm extends AppComponent {
  static cn = 'app-note-form';

  constructor($root, options) {
    super($root, {
      name: 'NoteForm',
      listeners: ['submit', 'mousedown'],
      ...options,
    });
    this.formError = '';
    this.isValid = false;
  }

  init() {
    super.init();

    this.$formOverlay = this.$root.findByDataType('note-form-overlay');
    this.$formError = this.$root.findByDataType('note-form-error');
    this.$formFields = this.$root.findByDataType('note-form-fields');
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
    this.noteToEdit = this.store
        .getState()
        .notes.find((note) => note.id === noteID);

    if (this.noteToEdit) {
      delete this.noteToEdit.id;
      this.$formFields.attr('data-edit', noteID);
    }

    this.renderFields(this.noteToEdit);
    this.$formOverlay.removeClass('hidden');
  }

  saveNote(action) {
    this.$storeDispatch(action);
    this.closeForm();
  }

  formValidator(formData, editID) {
    this.isValid = Object.values(formData).every((val) => val.length);
    this.formError = !this.isValid && 'Form is empty';

    if (editID) {
      this.isValid = !shallowEqual(formData, this.noteToEdit);
      this.formError = !this.isValid && 'Form is not modified';
    }
  }

  onSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const formProps = Object.fromEntries(formData);
    const editID = this.$formFields.attr('data-edit');

    this.formValidator(formProps, editID);

    if (this.isValid) {
      const action = {
        type: editID ? 'EDIT_NOTE' : 'SAVE_NOTE',
        payload: {...formProps, id: editID || generateID()},
      };
      return this.saveNote(action);
    }
    this.renderError();
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
    this.$formFields.removeAttr('data-edit');
    this.$formOverlay.addClass('hidden');
    this.$formFields.html('');
    this.$formError.html('');
  }

  renderFields(data) {
    this.$formFields.html('');
    this.$formFields.html(`
      <input value="${data?.title || ''}" class="form-input" type="text" name="title" placeholder="Note title" />
      <textarea class="form-input resize-y max-h-56" name="description" placeholder="Note description">${ data?.description || ''}</textarea>
      <button class="form-btn self-center" type="submit">Submit</button>
    `);
  }

  renderError() {
    this.$formError.html('');
    this.$formError.html(`
      <p class="text-red-500 mb-4">${this.formError}</p>
    `);
  }
}
