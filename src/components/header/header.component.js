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

    this.$deleteBtn = null;
  }

  init() {
    super.init();

    this.$deleteBtn = this.$root.findByDataType('note-delete-btn');
    this.$storeSubscribe(({selected}) => {
      if (selected.length > 1) {
        return this.$deleteBtn.removeClass('hidden');
      }
      this.$deleteBtn.addClass('hidden');
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

    if (type === 'note-delete-btn') {
      this.$storeDispatch({
        type: 'DELETE_SELECTED_NOTES',
      });
    }
  }
}
