import {AppComponent} from './app-component.core';
import {checkEmptyValues} from './utils.core';

export class Form extends AppComponent {
  static cn = 'app-form';

  constructor($root, {onFormSubmit, ...options}) {
    super($root, {
      name: 'Form',
      listeners: ['submit'],
      ...options,
    });
    this.$root = $root;
    this.onFormSubmit = onFormSubmit;

    this.formError = '';
    this.isValid = false;

    this.$formError = null;
    this.$formFields = null;
  }

  init() {
    super.init();
    this.$root.html(this.toHTML());

    this.$formError = this.$root.findByDataType('note-form-error');
    this.$formFields = this.$root.findByDataType('note-form-fields');
  }

  formValidator(formData) {
    this.isValid = checkEmptyValues(formData);
    this.formError = !this.isValid ? 'Form is empty' : '';
  }

  onSubmit(evt) {
    evt.preventDefault();
    const formData = Object.fromEntries(new FormData(evt.target));
    this.formValues = {...this.formValues, ...formData};
    this.formValidator(formData);

    if (this.isValid) {
      this.clearForm();
      this.onFormSubmit(this.formValues);
    }
    this.renderError();
  }

  toHTML() {
    return `
        <form class="self-center mx-auto w-full max-w-lg bg-white rounded-md p-4">
            <div data-type="note-form-error"></div>
            <div data-type="note-form-fields" class="flex flex-col space-y-4"></div>
            <button class="form-btn self-center mt-4" type="submit">Submit</button>
        </form>
    `;
  }

  clearForm() {
    this.$formFields.html('');
    this.$formError.html('');
  }

  renderFields(formFields, data) {
    this.$formFields.html('');
    if (data) {
      this.formValues = {...data};
    }

    Object.keys(formFields).forEach((key) => {
      const {
        tag = 'input',
        cn = '',
        type = 'text',
        value = '',
        placeholder = '',
        selfClosing = true,
      } = formFields[key];
      const formValue = data?.[key] || value;

      this.$formFields.insertHtml(`
        <${tag} name="${key}" type="${type}" class="${cn}" value="${formValue}" placeholder="${placeholder}" ${
        selfClosing ? '/>' : '>' + formValue + '</' + tag + '>'}
      `);
    });
  }

  renderError() {
    this.$formError.html('');
    this.$formError.html(`
            <p class="text-red-500 mb-4">${this.formError}</p>
        `);
  }
}
