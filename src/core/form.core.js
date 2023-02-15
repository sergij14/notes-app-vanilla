import {AppComponent} from './app-component.core';
import {checkEmptyValues} from './utils.core';

export class Form extends AppComponent {
  static cn = 'app-form';

  constructor($root, options) {
    super($root, {
      name: 'Form',
      listeners: ['submit'],
      ...options,
    });
    this.$root = $root;

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

  formValidator(formData, isEditForm) {
    this.isValid = checkEmptyValues(formData);
    this.formError = !this.isValid ? 'Form is empty' : '';
  }

  onSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const formValues = Object.fromEntries(formData);

    this.formValidator(formValues);

    if (this.isValid) {
      console.log('valid');
      this.clearForm();
      this.$emit('form: form-valid');
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
    Object.keys(formFields).forEach((key) => {
      const {
        tag = 'input',
        cn = '',
        type = 'text',
        value = '',
        placeholder = '',
        selfClosing = true,
      } = formFields[key];
      const formValue = data[key] || value;

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

// import {AppComponent} from '../../core/app-component.core';
// import {
//   checkEmptyValues,
//   generateID,
//   shallowEqual,
// } from '../../core/utils.core';
// import {getNoteFormTemplate} from './note-form.template';

// export class NoteForm extends AppComponent {
//   static cn = 'app-note-form';

//   constructor($root, options) {
//     super($root, {
//       name: 'NoteForm',
//       listeners: ['submit', 'mousedown'],
//       ...options,
//     });
//     this.formError = '';
//     this.isValid = false;
//     this.noteToEdit = {};
//   }

//   init() {
//     super.init();

//     this.$formOverlay = this.root.findByDataType('note-form-overlay');
//     this.$formError = this.$root.findByDataType('note-form-error');
//     this.$formFields = this.$root.findByDataType('note-form-fields');
//     this.$subscribe('notes-list: edit-note', (noteID) => {
//       this.openForm(noteID);
//     });
//     this.$subscribe('header: create-note', () => {
//       this.openForm();
//     });
//   }

//   toHTML() {
//     return getNoteFormTemplate();
//   }

//   openForm(noteID) {
//     this.noteToEdit = this.store.getState().notes[noteID];

//     if (this.noteToEdit) {
//       this.$formFields.attr('data-edit', noteID);
//     }

//     this.renderFields(this.noteToEdit);
//     this.$formOverlay.removeClass('hidden');
//   }

//   saveNote(action) {
//     this.$storeDispatch(action);
//     this.closeForm();
//   }

//   formValidator(formData, editID) {
//     this.isValid = checkEmptyValues(formData);
//     this.formError = !this.isValid && 'Form is empty';

//     if (editID && checkEmptyValues(formData)) {
//       const editedNote = {...this.noteToEdit};
//       delete editedNote.id;

//       this.isValid = !shallowEqual(formData, editedNote);
//       this.formError = !this.isValid && 'Form is not modified';
//     }
//   }

//   onSubmit(evt) {
//     evt.preventDefault();
//     const formData = new FormData(evt.target);
//     const formProps = Object.fromEntries(formData);
//     const editID = this.$formFields.attr('data-edit');

//     this.formValidator(formProps, editID);

//     if (this.isValid) {
//       const action = {
//         type: editID ? 'EDIT_NOTE' : 'SAVE_NOTE',
//         payload: {...formProps, id: editID || generateID()},
//       };
//       return this.saveNote(action);
//     }
//     this.renderError();
//   }

//   onMousedown(evt) {
//     const {type} = evt.target.dataset;

//     if (type === 'note-form-btn') {
//       this.openForm();
//     }

//     if (type === 'note-form-overlay') {
//       this.closeForm();
//     }
//   }

//   closeForm() {
//     this.$formFields.removeAttr('data-edit');
//     this.$formOverlay.addClass('hidden');
//     this.$formFields.html('');
//     this.$formError.html('');
//   }

//   renderFields(data) {
//     this.$formFields.html('');
//     this.$formFields.html(`
//       <input value="${data?.title || ''}" class="form-input" type="text" name="title" placeholder="Note title" />
//       <textarea class="form-input resize-y max-h-56" name="description" placeholder="Note description">${data?.description || ''}</textarea>
//     `);
//   }

//   renderError() {
//     this.$formError.html('');
//     this.$formError.html(`
//       <p class="text-red-500 mb-4">${this.formError}</p>
//     `);
//   }
// }
