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
    this.$subscribe('notes-list: edit-note', (noteId) => {
      this.openForm();
    });
  }

  toHTML() {
    return getHeaderFormTemplate();
  }

  onSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const formProps = Object.fromEntries(formData);

    console.log(formProps);
  }

  onMousedown(evt) {
    if (evt.target.dataset.type === 'note-form-btn') {
      this.openForm();
    }

    if (evt.target.dataset.type === 'note-form-overlay') {
      this.closeForm();
    }
  }

  openForm() {
    this.renderFields();
    this.$formOverlay?.classList.remove('hidden');
  }

  closeForm() {
    this.clearFields();
    this.$formOverlay?.classList.add('hidden');
  }

  renderFields(data) {
    this.$form.innerHTML = '';
    this.$form.innerHTML = `
      <input value="${data?.title || ''}" class="form-input" type="text" name="note_title" placeholder="Note title" />
      <textarea value="${data?.description || ''}" class="form-input resize-y max-h-56" name="note_description" placeholder="Note description"></textarea>
      <button class="form-btn self-center" type="submit">Submit</button>
    `;
  }

  clearFields() {
    this.$form.innerHTML = '';
  }
}
