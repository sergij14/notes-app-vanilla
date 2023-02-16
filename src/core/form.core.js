import {AppComponent} from './app-component.core';
import {hasValues} from './utils.core';

export class Form extends AppComponent {
  static cn = 'app-form';

  constructor($root, {onFormSubmit, formConfig, ...options}) {
    super($root, {
      name: 'Form',
      listeners: ['submit', 'input'],
      ...options,
    });
    this.$root = $root;

    this.onFormSubmit = onFormSubmit;
    this.formConfig = formConfig;

    this.formValues = {};
    this.touched = false;
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
    if (!this.touched) {
      this.formError = 'Form is not modified';
      this.isValid = false;
      return;
    }

    this.isValid = hasValues(formData);
    this.formError = !this.isValid ? 'Form is not filled' : '';
  }

  onSubmit(evt) {
    evt.preventDefault();
    const formData = Object.fromEntries(new FormData(evt.target));
    this.formValidator(formData);

    this.formValues = {...this.formValues, ...formData};

    if (this.isValid) {
      this.clearForm();
      return this.onFormSubmit(this.formValues);
    }
    this.renderError();
  }

  onInput() {
    this.touched = true;
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

  renderFields(data) {
    this.$formFields.html('');
    this.touched = false;
    this.formValues = data ? {...data} : {};

    this.formConfig.forEach((field) => {
      field.value = data?.[field.name] || '';
      this.$formFields.insertHtml(getFieldTemplate(field));
    });
  }

  renderError() {
    this.$formError.html('');
    this.$formError.html(`<p class="text-red-500 mb-4">${this.formError}</p>`);
  }
}

export function getFieldTemplate(config) {
  const {
    value = '',
    placeholder = '',
    classes = '',
    name = '',
    type = 'text',
  } = config;
  switch (type) {
    case 'number':
      return `<input value="${value}" name="${name}" class="${classes}" type="${type}" min="1" max="10" placeholder="${placeholder}" />`;
    case 'text-area':
      return `<textarea name="${name}" class="${classes}" placeholder="${placeholder}">${value}</textarea>`;
    default:
      return `<input value="${value}" name="${name}" class="${classes}" type="text" placeholder="${placeholder}" />`;
  }
}
