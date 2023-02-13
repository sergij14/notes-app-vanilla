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
    const {type} = evt.target.dataset;

    if (type === 'note-form-btn') {
      this.$emit('header: create-note');
    }
  }
}
