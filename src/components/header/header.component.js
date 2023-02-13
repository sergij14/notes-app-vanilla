import {AppComponent} from '../../core/app-component.core';
import {getHeaderTemplate} from './header.template';

export class Header extends AppComponent {
  static cn = 'app-header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['click'],
      ...options,
    });
  }

  toHTML() {
    return getHeaderTemplate();
  }

  onClick(evt) {
    if (evt.target.dataset.type === 'note-form-btn') {
      this.$emit('header: create-note');
    }
  }
}
