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

    this.$formOverlay = this.$root.find('[data-type=\'note-form-overlay\']');
    this.$form = this.$root.find('form');
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
    const editID = this.$form.attr('data-edit');

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
    this.closeForm();
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
      this.$form.attr('data-edit', noteID);
    }

    this.renderFields(note);
    this.$formOverlay.removeClass('hidden');
  }

  closeForm() {
    this.clearFields();
    this.$form.removeAttr('data-edit');
    this.$formOverlay.addClass('hidden');
  }

  renderFields(data) {
    this.$form.html('');
    this.$form.html(`
      <input value="${
  data?.title || ''
}" class="form-input" type="text" name="title" placeholder="Note title" />
      <textarea class="form-input resize-y max-h-56" name="description" placeholder="Note description">${
  data?.description || ''
}</textarea>
      <button class="form-btn self-center" type="submit">Submit</button>
    `);
  }

  clearFields() {
    this.$form.html('');
  }
}

function generateID() {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}
