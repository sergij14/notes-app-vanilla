import {AppComponent} from '../../core/app-component.core';
import {getHeaderFormTemplate} from './header-form.template';

export class HeaderForm extends AppComponent {
  static cn = 'app-header';

  constructor($root, options) {
    super($root, {
      name: 'HeaderForm',
      listeners: ['submit', 'mousedown'],
      ...options,
    });
  }

  init() {
    super.init();

    this.$formOverlay = document.querySelector(
        '[data-type=\'note-form-overlay\']'
    );
    this.$form = this.$formOverlay.querySelector('form');
    this.$subscribe('notes-list: edit-note', (noteID) => {
      this.openForm(noteID);
    });
  }

  toHTML() {
    return getHeaderFormTemplate();
  }

  onSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const formProps = Object.fromEntries(formData);
    const editID = this.$form.getAttribute('data-edit');

    if (editID) {
      this.$storeDispatch({
        type: 'EDIT_NOTE',
        payload: {...formProps, id: editID},
      });
    } else {
      this.$storeDispatch({
        type: 'SAVE_NOTE',
        payload: {...formProps, id: generateID()},
      });
    }
  }

  onMousedown(evt) {
    if (evt.target.dataset.type === 'note-form-btn') {
      this.openForm();
    }

    if (evt.target.dataset.type === 'note-form-overlay') {
      this.closeForm();
    }
  }

  openForm(noteID) {
    const note = this.store
        .getState()
        ?.notes?.find((note) => note.id === noteID);

    if (note) {
      this.$form.setAttribute('data-edit', noteID);
    }

    this.renderFields(note);
    this.$formOverlay?.classList.remove('hidden');
  }

  closeForm() {
    this.clearFields();
    this.$form.removeAttribute('data-edit');
    this.$formOverlay?.classList.add('hidden');
  }

  renderFields(data) {
    this.$form.innerHTML = '';
    this.$form.innerHTML = `
      <input value="${
  data?.title || ''
}" class="form-input" type="text" name="title" placeholder="Note title" />
      <textarea class="form-input resize-y max-h-56" name="description" placeholder="Note description">${
  data?.description || ''
}</textarea>
      <button class="form-btn self-center" type="submit">Submit</button>
    `;
  }

  clearFields() {
    this.$form.innerHTML = '';
  }
}

function generateID() {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}
