import {AppComponent} from '../../core/app-component.core';
import {getHeaderFormTemplate} from './header-form.template';

export class HeaderForm extends AppComponent {
    static cn = 'app-header'

    constructor($root, options) {
      super($root, {
        name: 'HeaderForm',
        listeners: [
          'submit',
          'mousedown',
        ],
        ...options,
      });
    }

    init() {
      super.init();

      this.emitter.subscribe('NotesList: edit-note', (noteId) => {
        console.log(noteId);
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
      const $formOverlay = document.querySelector('[data-type=\'note-form-overlay\']');

      if (evt.target.dataset.type === 'note-form-btn') {
        $formOverlay?.classList.remove('hidden');
      }

      if (evt.target.dataset.type === 'note-form-overlay') {
        $formOverlay?.classList.add('hidden');
      }
    }
}
