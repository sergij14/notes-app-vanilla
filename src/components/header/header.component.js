import {AppComponent} from '../../core/app-component.core';
import {getHeaderTemplate} from './header.template';

export class Header extends AppComponent {
    static cn = 'app-header'

    constructor($root) {
      super($root, {
        name: 'Header',
        listeners: [
          'submit',
          'click',
        ],
      });
    }

    toHTML() {
      return getHeaderTemplate();
    }

    onSubmit(evt) {
      evt.preventDefault();
      const formData = new FormData(evt.target);
      const formProps = Object.fromEntries(formData);

      console.log(formProps);
    }

    onClick(evt) {
      const $formOverlay = document.querySelector('[data-id=\'note-form-overlay\']');

      if (evt.target.dataset.id === 'note-form-btn') {
        $formOverlay.classList.remove('hidden');
      }

      if (evt.target.dataset.id === 'note-form-overlay') {
        $formOverlay.classList.add('hidden');
      }
    }
}
