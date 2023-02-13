import {AppComponent} from '../../core/app-component.core';
import {getFooterTemplate} from './footer.template';

export class Footer extends AppComponent {
  static cn = 'app-footer';

  constructor($root, options) {
    super($root, {
      name: 'Footer',
      ...options,
    });
  }

  toHTML() {
    return getFooterTemplate();
  }
}
